import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { UploadDialogComponentComponent } from './dialog/upload-dialog-component/upload-dialog-component.component';
import { KmeansService } from './kmeans.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-kmeans',
  templateUrl: './kmeans.component.html',
  styleUrls: ['./kmeans.component.scss']
})
export class KmeansComponent implements OnInit {
  @ViewChild('file', { static: false }) file :ElementRef<any> = {} as ElementRef<any>;
  // @ViewChild('file', {static: false}) file :any ;
  public files: Set<File> = new Set() ;
  constructor(public dialog: MatDialog,public KmeansServiceobj :KmeansService,
    public toastr: ToastrService,public router: Router,
    // public dialogRef: MatDialogRef<KmeansComponent>, 
    public kmeansService: KmeansService) { }

  ngOnInit(): void {
  }
  progress:any;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  showUploadContent= true;

  refreshcomponent() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/clustering/scikitlearn/kmeans']);
  }); 
  }


  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  addFiles() {
    this.file.nativeElement.click();
  }

closeContent(){
  this.refreshcomponent() 
}

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      // this.showUploadContent =false;
    }
    // set the component state to "uploading"
    this.uploading = true;

    if (this.isxlsoralsx(this.files)) {
      // start the upload and save the progress map
      this.progress = this.kmeansService.upload(this.files);
      console.log('this.progress', this.progress);
      for (const key in this.progress) {
        this.progress[key].progress.subscribe((val :any) => console.log(val));
      }

      // convert the progress map into an array
      let allProgressObservables = [];
      for (let key in this.progress) {
        allProgressObservables.push(this.progress[key].progress);
      }

      // Adjust the state variables
      // The OK-button should have the text "Finish" now
      this.primaryButtonText = 'Upload';
      // The dialog should not be closed while uploading
      this.canBeClosed = true;
      // this.dialogRef.disableClose = true;

      // Hide the cancel-button
      // this.showCancelButton = false;
      // When all progress-observables are completed...
      forkJoin(allProgressObservables).subscribe(end => {
        // ... the dialog can be closed again...
        this.canBeClosed = true;
        // this.dialogRef.disableClose = false;
        console.log('end', end);
        // ... the upload was successful...
        // this.toastr.success('Files uploaded successfully', 'Done', { timeOut: 2000 });
        this.uploadSuccessful = true;
        // ... and the component is no longer uploading
        this.uploading = false;
      }, error => {
        this.toastr.error(error.message, 'Error', { timeOut: 4000 });
        console.log('error', error)
      });
    } else {
      this.toastr.error('Only csv  files are accepts to upload', 'Error', { timeOut: 4000 });
    }

  }

  isxlsoralsx(files :any) {
    var contains: boolean = true;
    // this.files.forEach(file => {
    //    console.log('file.name', file.name);
    //   if (file.name.endsWith('xlsx') || file.name.endsWith('xls')) {
    //     contains = true;
    //   } else {
    //     console.log('not excel');
    //     contains = false;
    //     return contains;
    //   }
    // });
    // console.log('files', files);
    //  console.log('files size', files.size);
    for (var file of files) {
      // const file = files[index];
      console.log('file.name', file.name);
      if (file.name.endsWith('csv') || file.name.endsWith('csv')) {
        // console.log('excel');
        contains = true;
      } else {
        // console.log('not excel');
        contains = false;
        break;
      }
    }
    return contains;
  }
  public openUploadDialog() {
    const dialogRef = this.dialog.open(UploadDialogComponentComponent, { width: '50%', height: '50%' });
  }
  downloadFileSystem( ) {
    // console.log('fileSystemName', fileSystemName);

    this.KmeansServiceobj.downloadFileSystem()
      .subscribe( (response :any) => {
        console.log('fileSystemName', response);
      });
  }

}
