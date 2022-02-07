import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { forkJoin, Subscription } from 'rxjs';
import { KmeansService } from './kmeans.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, finalize } from 'rxjs/operators';
import * as fileSaver from 'file-saver';
// import { MatRadioChange } from '@angular/material';
export interface kmeansReturnedObj {
  kmeans: string;
  n_iter: number;
  inertia: number;
  numberOfK: string;
}
@Component({
  selector: 'app-kmeans',
  templateUrl: './kmeans.component.html',
  styleUrls: ['./kmeans.component.scss']
})
export class KmeansComponent implements OnInit {
  kmeansRObj: kmeansReturnedObj = {} as kmeansReturnedObj;
  busy: Subscription = {} as Subscription;
  ServerandPort = environment.ServerandPort;
  uploadURL = this.ServerandPort + '/upload-file';
  displayidentity = false
  noOfRows: number = 0;
  noOfColumns: number = 0;
  fileName = '';
  displayManualK = true;
  displaySystemK = false;
  noOfK : number = 0;
  method: string = "elbow";
  imageData: string | ArrayBuffer | null = "";
  myDate = +new Date();
  datetoString = "km"+this.myDate ;
  kmethod: string ="System";
  methods: string[] = ['Manual', 'System'];
  manualK : number= 0;
  ngOnInit() {
  }


  refreshcomponent() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/clustering/scikitlearn/kmeans'])
    );
  }
  constructor(private http: HttpClient, public toastr: ToastrService, public router: Router,  
    public KmService :KmeansService) { }

    radioChange(event: any) {
      console.log(event.source.name,event.value);
      if(event.value == 'Manual') {
        this.manualK = this.noOfK;
        console.log('this.manualK',this.manualK)
        console.log('this.noOfK',this.noOfK)
        this.displayManualK = false;
        this.displaySystemK = true;
      }
      else if (event.value == 'System'){
        this.manualK = 0;
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
      
      var url = this.uploadURL + '/?noOfRows=' + this.noOfRows + '&noOfColumns=' + this.noOfColumns + '&method=' 
      + this.method +'&clustringImageName='+this.datetoString+'&kManualcluster='+this.noOfK;
      console.log(url)
      this.busy = this.http.post(url, formData).subscribe((response: any) => {

        this.toastr.success(file.name + ' loaded successfully', 'Done', { timeOut: 2000 });                      //Next callback
        // console.log('response received')
        console.log(response);
        this.kmeansRObj = response;
        this.displayidentity = true;

      //  
      this.KmService.getImage(formData, this.datetoString)
      .subscribe(
        r => {
          const fileReader = new FileReader();
          fileReader.addEventListener('load', () => {
            this.imageData = fileReader.result;
          }, true);
  
          if (r) {
            fileReader.readAsDataURL(r.body);
          }
        },
        e => {
          console.error(e);
        }
      );
      // 


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

    this.KmService.downloadFileSystem(this.datetoString)
      .subscribe( (response :any) => {
        let blobtool5 = new Blob([response], { type: 'application/octet-stream' });
        fileSaver.saveAs(blobtool5, 'kmeansClustringModel.pkl');
      });
  }

  downloadOutPutFileSystem() {
    console.log('fileSystemName', this.datetoString);

    this.KmService.downloadOutPutFileSystem(this.datetoString)
      .subscribe( (response :any) => {
        let blobtool5 = new Blob([response], { type: 'application/octet-stream' });
        fileSaver.saveAs(blobtool5, 'kmeansOutputFile.csv');
      });
  }
}
