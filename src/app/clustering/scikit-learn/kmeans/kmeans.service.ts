import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpResponse, HttpEventType, HttpRequest } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { kmeansReturnedObj } from './kmeans.component';




@Injectable({
  providedIn: 'root'
})
export class KmeansService {
  kmeansreObj2: kmeansReturnedObj = {} as kmeansReturnedObj;
  ServerandPort = environment.ServerandPort;
  kmeansreObj: kmeansReturnedObj = {} as kmeansReturnedObj;
  uploadURL = this.ServerandPort + '/upload-file';
  constructor(public http: HttpClient, public toastr: ToastrService) { }

  downloadFileSystem(filename: string): Observable<any> {
    const getfileheaders = new HttpHeaders().set('Accept', 'application/octet-stream');

    return this.http.get(this.ServerandPort + '/kmclustring/model/?modelName=' + filename+'.pkl', { responseType: 'blob', headers: getfileheaders });
  }

  downloadOutPutFileSystem(filename: string): Observable<any> {
    const getfileheaders = new HttpHeaders().set('Accept', 'application/octet-stream');

    return this.http.get(this.ServerandPort + '/kmclustring/outputdata?outputFileName=' + filename+'output.csv', { responseType: 'blob', headers: getfileheaders });
  }

  public getImage(formData: FormData, imagename : string): Observable<any> {
    const url = this.ServerandPort + '/kmclustring/image?imageName='+imagename;
    return this.http.post(url, formData, {observe: 'response', responseType: 'blob'});
  }

  public upload(files: Set<File>): kmeansReturnedObj {

    
    return this.kmeansreObj2;
  }
}
