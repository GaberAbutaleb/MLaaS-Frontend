import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

import * as fileSaver from 'file-saver';
import { KmeansService } from '../kmeans/kmeans.service';
import { HierarchicalService } from './hierarchical.service';
export interface HierReturnedObj {
  HierarchicalCluster: string;
  n_clusters: number;
  numberOfK: string;
}
@Component({
  selector: 'app-hierarchical',
  templateUrl: './hierarchical.component.html',
  styleUrls: ['./hierarchical.component.scss']
})
export class HierarchicalComponent implements OnInit {
  HierObj: HierReturnedObj = {} as HierReturnedObj;
  busy: Subscription = {} as Subscription;
  ServerandPort = environment.ServerandPort;
  uploadURL = this.ServerandPort + '/HClusterUpload-file';
  noOfRows: number = 0;
  noOfColumns: number = 0;
  fileName = '';
  noOfK : number = 2;
  affinity: string = "euclidean";
  linkage: string = "ward";
  displayidentity = false;
  imageData: string | ArrayBuffer | null = "";
  myDate = +new Date();
  datetoString = "hier"+this.myDate ;
  constructor(private http: HttpClient, public toastr: ToastrService, public router: Router,  
    public hierService :HierarchicalService, public kmservice:KmeansService) { }
  ngOnInit(): void {
  }
  refreshcomponent() {
    this.router.navigateByUrl('/RefreshHierComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/clustering/scikitlearn/hierarchical'])
    );
  }
  
  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("uploaded_file", file);
      var url = this.uploadURL + '/?noOfRows=' + this.noOfRows + '&noOfColumns=' + this.noOfColumns + 
      '&clustringImageName='+this.datetoString  +'&number_of_HCluster='
      +this.noOfK +'&affinity='+ this.affinity +'&linkage='+this.linkage;
      console.log(url)
      this.busy = this.http.post(url, formData).subscribe((response: any) => {
        this.toastr.success(file.name + ' loaded successfully', 'Done', { timeOut: 2000 });                      //Next callback
        // console.log('response received')
        console.log(response);
        this.HierObj = response;
        this.displayidentity = true;

       
      this.kmservice.getImage(formData, this.datetoString)
      .subscribe(
        (r:any) => {
          const fileReader = new FileReader();
          fileReader.addEventListener('load', () => {
            this.imageData = fileReader.result;
          }, true);
  
          if (r) {
            fileReader.readAsDataURL(r.body);
          }
        },
      (e:any) => {
          console.error(e);
        }
      );
      


      },
        (error) => {                              //Error callback
          console.error('error caught in component')
          this.toastr.error(file.name + error.error.message, 'Error', { timeOut: 4000 });
          console.log('this is the error', error.error.message);

          //throw error;   //You can also throw the error to a global error handler
        });
    }
  }
  
  downloadFileSystem() {
    console.log('fileSystemName', this.datetoString);

    this.hierService.downloadFileSystem(this.datetoString)
      .subscribe( (response :any) => {
        let blobtool5 = new Blob([response], { type: 'application/octet-stream' });
        fileSaver.saveAs(blobtool5, 'hierarchicalClustringModel.pkl');
      });
  }

  downloadOutPutFileSystem() {
    console.log('fileSystemName', this.datetoString);

    this.hierService.downloadOutPutFileSystem(this.datetoString)
      .subscribe( (response :any) => {
        let blobtool5 = new Blob([response], { type: 'application/octet-stream' });
        fileSaver.saveAs(blobtool5, 'hierarchicalOutputFile.csv');
      });
  }



}
