import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpResponse, HttpEventType, HttpRequest } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { kmeansReturnedObj } from './kmeans.component';

export interface MLModInfoReq {
  model_Category: string;
  model_used: string;
  deployment_Model_Name: string;
  Model_Output_File_Name: string;
}


@Injectable({
  providedIn: 'root'
})
export class KmeansService {
  kmeansreObj2: kmeansReturnedObj = {} as kmeansReturnedObj;
  mlMInfoReq: MLModInfoReq = {} as MLModInfoReq;
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
  downloadOutPutFile(filename: string): Observable<any> {
    const getfileheaders = new HttpHeaders().set('Accept', 'application/octet-stream');

    return this.http.get(this.ServerandPort + '/kmclustring/outputdata?outputFileName=' + filename, { responseType: 'blob', headers: getfileheaders });
  }
  downloadDeploymentFile(filename: string): Observable<any> {
    const getfileheaders = new HttpHeaders().set('Accept', 'application/octet-stream');

    return this.http.get(this.ServerandPort + '/kmclustring/model?modelName=' + filename, { responseType: 'blob', headers: getfileheaders });
  }




  public getImage(formData: FormData, imagename : string): Observable<any> {
    const url = this.ServerandPort + '/kmclustring/image?imageName='+imagename;
    return this.http.post(url, formData, {observe: 'response', responseType: 'blob'});
  }

  public upload(files: Set<File>): kmeansReturnedObj {

    
    return this.kmeansreObj2;
  }


  SaveModelInfo(model_Category :string , model_used :string,deployment_Model_Name :string,
    Model_Output_File_Name :string) {
      this.mlMInfoReq.Model_Output_File_Name = Model_Output_File_Name ;
      this.mlMInfoReq.deployment_Model_Name = deployment_Model_Name ;
      this.mlMInfoReq.model_used = model_used;
      this.mlMInfoReq.model_Category = model_Category;
      const url = this.ServerandPort + '/InsertuserModelsInfo';
      return this.http.post(url,this.mlMInfoReq);
    }

    getAll(path :any) {
      return this.http.get(this.ServerandPort + path);
    }

    delete(path :any, id: any) {
      // console.log(this.ServerandPort + path + '/' + id);
      // , this.httpOptions
      return this.http.delete(this.ServerandPort + path +'/'+ id);
    }



}
