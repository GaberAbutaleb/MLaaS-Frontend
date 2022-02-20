import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpResponse, HttpEventType, HttpRequest } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HierarchicalService {
  ServerandPort = environment.ServerandPort;
  constructor(public http: HttpClient, public toastr: ToastrService) { }

  downloadFileSystem(filename: string): Observable<any> {
    const getfileheaders = new HttpHeaders().set('Accept', 'application/octet-stream');

    return this.http.get(this.ServerandPort + '/kmclustring/model/?modelName=' + filename+'.pkl', { responseType: 'blob', headers: getfileheaders });
  }

  downloadOutPutFileSystem(filename: string): Observable<any> {
    const getfileheaders = new HttpHeaders().set('Accept', 'application/octet-stream');

    return this.http.get(this.ServerandPort + '/kmclustring/outputdata?outputFileName=' + filename+'output.csv', { responseType: 'blob', headers: getfileheaders });
  }


}
