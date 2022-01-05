import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpResponse, HttpEventType, HttpRequest } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KmeansService {
  ServerandPort = environment.ServerandPort;
  uploadURL = this.ServerandPort + '/upload-file';
  constructor(public http: HttpClient, public toastr: ToastrService) { }

  downloadFileSystem(): Observable<any> {
    // const getfileheaders = new HttpHeaders().set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    return this.http.get(this.ServerandPort + '/item' );
    // , { responseType: 'blob', headers: getfileheaders });
  }

  public upload(files: Set<File>): { [key: string]: { progress: Observable<number> } } {

    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number> } } = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('uploaded_file', file, file.name);
      // formData.append('type','application/vnd.ms-excel');
      // create a http-post request and pass the form
      // tell it to report the upload progress
      var method :string = 'elbow'
      const req = new HttpRequest('POST', this.uploadURL+'/?noOfRows=0&noOfColumns=4&method=elbow', formData, {
        reportProgress: true
      });
      // create a new progress-subject for every file
      const progress = new Subject<number>();
      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe((event :any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);
          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          console.log('this is the event', event.body);
          this.toastr.success(file.name + ' loaded successfully', 'Done', { timeOut: 2000 });
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      }, error => {
        this.toastr.error(file.name + error.error.message, 'Error', { timeOut: 4000 });
        console.log('this is the error', error.error);

      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }
}
