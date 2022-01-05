import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { forkJoin } from 'rxjs';


import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { KmeansService } from '../../kmeans.service';

@Component({
  selector: 'app-upload-dialog-component',
  templateUrl: './upload-dialog-component.component.html',
  styleUrls: ['./upload-dialog-component.component.css']
})
export class UploadDialogComponentComponent implements OnInit {

  // @ViewChild('file', { static: false }) file :ElementRef<any> = {} as ElementRef<any>;

  // public files: Set<File> = new Set();

  // constructor(public toastr: ToastrService,
  //   public dialogRef: MatDialogRef<UploadDialogComponentComponent>, 
  //   public kmeansService: KmeansService) { }

  ngOnInit() { }

  // progress:any;
  // canBeClosed = true;
  // primaryButtonText = 'Upload';
  // showCancelButton = true;
  // uploading = false;
  // uploadSuccessful = false;

  // onFilesAdded() {
  //   const files: { [key: string]: File } = this.file.nativeElement.files;
  //   for (let key in files) {
  //     if (!isNaN(parseInt(key))) {
  //       this.files.add(files[key]);
  //     }
  //   }
  // }

  // addFiles() {
  //   this.file.nativeElement.click();
  // }

  // closeDialog() {
  //   // if everything was uploaded already, just close the dialog
  //   if (this.uploadSuccessful) {
  //     return this.dialogRef.close();
  //   }
  //   // set the component state to "uploading"
  //   this.uploading = true;

  //   if (this.isxlsoralsx(this.files)) {
  //     // start the upload and save the progress map
  //     this.progress = this.kmeansService.upload(this.files);
  //     console.log('this.progress', this.progress);
  //     for (const key in this.progress) {
  //       this.progress[key].progress.subscribe((val :any) => console.log(val));
  //     }

  //     // convert the progress map into an array
  //     let allProgressObservables = [];
  //     for (let key in this.progress) {
  //       allProgressObservables.push(this.progress[key].progress);
  //     }

  //     // Adjust the state variables
  //     // The OK-button should have the text "Finish" now
  //     this.primaryButtonText = 'Finish';
  //     // The dialog should not be closed while uploading
  //     this.canBeClosed = false;
  //     this.dialogRef.disableClose = true;

  //     // Hide the cancel-button
  //     // this.showCancelButton = false;
  //     // When all progress-observables are completed...
  //     forkJoin(allProgressObservables).subscribe(end => {
  //       // ... the dialog can be closed again...
  //       this.canBeClosed = true;
  //       this.dialogRef.disableClose = false;
  //       console.log('end', end);
  //       // ... the upload was successful...
  //       // this.toastr.success('Files uploaded successfully', 'Done', { timeOut: 2000 });
  //       this.uploadSuccessful = true;
  //       // ... and the component is no longer uploading
  //       this.uploading = false;
  //     }, error => {
  //       this.toastr.error(error.message, 'Error', { timeOut: 4000 });
  //       console.log('error', error)
  //     });
  //   } else {
  //     this.toastr.error('Only csv  files are accepts to upload', 'Error', { timeOut: 4000 });
  //   }

  // }

  // isxlsoralsx(files :any) {
  //   var contains: boolean = true;
  //   // this.files.forEach(file => {
  //   //    console.log('file.name', file.name);
  //   //   if (file.name.endsWith('xlsx') || file.name.endsWith('xls')) {
  //   //     contains = true;
  //   //   } else {
  //   //     console.log('not excel');
  //   //     contains = false;
  //   //     return contains;
  //   //   }
  //   // });
  //   // console.log('files', files);
  //   //  console.log('files size', files.size);
  //   for (var file of files) {
  //     // const file = files[index];
  //     console.log('file.name', file.name);
  //     if (file.name.endsWith('csv') || file.name.endsWith('csv')) {
  //       // console.log('excel');
  //       contains = true;
  //     } else {
  //       // console.log('not excel');
  //       contains = false;
  //       break;
  //     }
  //   }
  //   return contains;
  // }
}


