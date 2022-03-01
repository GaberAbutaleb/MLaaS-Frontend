import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KmeansComponent } from './kmeans/kmeans.component';
import { MaterialModule } from 'src/app/material-module';
import { NgBusyModule } from 'ng-busy';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HierarchicalComponent } from './hierarchical/hierarchical.component';
import { clustringDialogadContentComponent, DisplayUserModelsComponent } from './display-user-models/display-user-models.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DBScanComponent } from './dbscan/dbscan.component';
// import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    KmeansComponent,
    HierarchicalComponent,
    DisplayUserModelsComponent,
    clustringDialogadContentComponent,
    DBScanComponent
    
    
  ], 
  exports : [
    KmeansComponent,
    HierarchicalComponent,
    DisplayUserModelsComponent,
    clustringDialogadContentComponent,
    DBScanComponent
    
    

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
