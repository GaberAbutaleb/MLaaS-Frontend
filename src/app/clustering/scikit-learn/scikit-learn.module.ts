import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KmeansComponent } from './kmeans/kmeans.component';
import { MaterialModule } from 'src/app/material-module';
import { NgBusyModule } from 'ng-busy';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@NgModule({
  declarations: [
    KmeansComponent,
    
  ], 
  exports : [
    KmeansComponent,
    
    

  ],
  entryComponents : [
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgBusyModule
  ]
})
export class ScikitLearnModule { }
