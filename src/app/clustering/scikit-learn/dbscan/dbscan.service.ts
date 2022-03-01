import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DBScanService {
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
