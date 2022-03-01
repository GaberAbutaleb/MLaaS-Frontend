import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KmeansService } from '../kmeans/kmeans.service';
import { DBScanService } from './dbscan.service';
import * as fileSaver from 'file-saver';

export interface DBScReturnedObj {
  DBScan: string;
  n_noise: number;
  numberOfK: string;
  epsvalue:number;
}
@Component({
  selector: 'app-dbscan',
  templateUrl: './dbscan.component.html',
  styleUrls: ['./dbscan.component.scss']
})
export class DBScanComponent implements OnInit {
  DBSObj: DBScReturnedObj = {} as DBScReturnedObj;
  busy: Subscription = {} as Subscription;
  ServerandPort = environment.ServerandPort;
  uploadURL = this.ServerandPort + '/DBScan-upload-file';
  noOfRows: number = 0;
  noOfColumns: number = 0;
  fileName = '';
  displayManualK = true;
  displaySystemK = false;
  eps : number = 1;
  min_samples : number =10;
  method: string = "elbow";
  displayidentity = false;
  methods: string[] = ['Manual', 'System'];
  imageData: string | ArrayBuffer | null = "";
  myDate = +new Date();
  finalesp : number= 0;
  kmethod: string ="System";
  datetoString = "DBSC"+this.myDate ;
  constructor(private http: HttpClient, public toastr: ToastrService, public router: Router,  
    public dbscanService :DBScanService, public kmservice:KmeansService) { }

  ngOnInit(): void {
  }
  refreshcomponent() {
    this.router.navigateByUrl('/RefreshDBScComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/clustering/scikitlearn/DBScan'])
    );
  }

  radioChange(event: any) {
    console.log(event.source.name,event.value);
    if(event.value == 'Manual') {
      this.finalesp = this.eps;
      console.log('this.finalesp',this.finalesp)
      console.log('this.noOfK',this.eps)
      this.displayManualK = false;
      this.displaySystemK = true;
    }
    else if (event.value == 'System'){
      this.finalesp = 0;
      this.displaySystemK = false;
      this.displayManualK = true;
    }
}
  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("uploaded_file", file);
      var url = this.uploadURL + '/?noOfRows=' + this.noOfRows + '&noOfColumns=' + this.noOfColumns + 
      '&clustringImageName='+this.datetoString  +'&espvalue='+ this.finalesp +'&minSamples='+this.min_samples;
      console.log(url)
      this.busy = this.http.post(url, formData).subscribe((response: any) => {
        this.toastr.success(file.name + ' loaded successfully', 'Done', { timeOut: 2000 });                      //Next callback
        // console.log('response received')
        console.log(response);
        this.DBSObj = response;
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

    this.dbscanService.downloadFileSystem(this.datetoString)
      .subscribe( (response :any) => {
        let blobtool5 = new Blob([response], { type: 'application/octet-stream' });
        fileSaver.saveAs(blobtool5, 'hierarchicalClustringModel.pkl');
      });
  }

  downloadOutPutFileSystem() {
    console.log('fileSystemName', this.datetoString);
    this.dbscanService.downloadOutPutFileSystem(this.datetoString)
      .subscribe( (response :any) => {
        let blobtool5 = new Blob([response], { type: 'application/octet-stream' });
        fileSaver.saveAs(blobtool5, 'DBScanOutputFile.csv');
      });
  }

  SaveModelInfo(){
    this.kmservice.SaveModelInfo('clustring' ,'dbscan',this.datetoString+'.pkl' ,
      this.datetoString+'output.csv')
    .subscribe(
      (r:any) => {
        this.toastr.success('Model Saved Successfully', 'Done', { timeOut: 2000 });
        console.log(r)
      },
    (e:any) => {
      this.toastr.error('Please check the log file', 'Error', { timeOut: 4000 });
        console.error(e);
      }
    );
    
  }






}
