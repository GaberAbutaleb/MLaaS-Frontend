import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KmeansComponent } from './kmeans/kmeans.component';
import { MaterialModule } from 'src/app/material-module';
import { NgBusyModule } from 'ng-busy';
import { UploadDialogComponentComponent } from './kmeans/dialog/upload-dialog-component/upload-dialog-component.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@NgModule({
  declarations: [
    KmeansComponent,
    UploadDialogComponentComponent
  ], 
  exports : [
    KmeansComponent,
    UploadDialogComponentComponent
    

  ],
  entryComponents : [
    UploadDialogComponentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgBusyModule
  ]
})
export class ScikitLearnModule { }
