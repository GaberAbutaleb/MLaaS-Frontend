import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { KmeansService } from '../kmeans/kmeans.service';
import { SelectionModel } from '@angular/cdk/collections';
import * as fileSaver from 'file-saver';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

export interface userModInfo {
  id:number;
  model_Category: string;
  deployment_Model_Name: string;
  model_used: string;
  create_date: any;
  username: string;
  Model_Output_File_Name: string;
}

export interface DataReturnedObjFromDialog {
  operationType: string;
  datasourceIndex: Number;
  userModInfoObj: userModInfo;
}

@Component({
  selector: 'app-display-user-models',
  templateUrl: './display-user-models.component.html',
  styleUrls: ['./display-user-models.component.scss']
})
export class DisplayUserModelsComponent implements OnInit {
  busy: Subscription = {} as Subscription;
  displayedColumns: string[] = ['select',
  'username','model_Category','model_used','deployment_Model_Name','create_date','Model_Output_File_Name'];
  resultsLength = 0;
  data: any = [];
  dataSource: any = [];
  selection = new SelectionModel<userModInfo>(true, []);
  @ViewChild(MatPaginator, {static: false}) paginator ?: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort ?: MatSort;

  constructor( public dialog: MatDialog,private http: HttpClient, public toastr: ToastrService
    , public router: Router, public kmservice:KmeansService) { }


    refreshcomponent() {
      // console.log('refresh')
      this.router.navigateByUrl('/RefreshDisplayUser', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/RefreshDisplayUser'])
      );
    }


  ngOnInit(): void {
    var modelCat= 'clustring';
    // console.log('refresh ng on')
    this.busy =   this.kmservice.getAll('/userModelsInformation?model_Category='+modelCat).subscribe (
      (returndata :any)  => {
        // this.resultsLength = returndata.length;
        this.toastr.success('data loaded successfully', 'Done', { timeOut: 2000 });
        this.data = returndata.result;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (error :any)  => {
        this.toastr.error(error.message, 'Error', { timeOut: 4000 });
        console.log(error);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach( (row :any) => this.selection.select(row));
  }
  downloadOutPutFile(fileName: string){
    console.log('fileSystemName',fileName) ;
    this.kmservice.downloadOutPutFile(fileName)
      .subscribe( (response :any) => {
        this.toastr.success('File Downloaded Successfully', 'Done', { timeOut: 2000 });
        let blobtool5 = new Blob([response], { type: 'application/octet-stream' });
        fileSaver.saveAs(blobtool5, fileName+'ierarchicalOutputFile.csv');
      });

  }
  downloadDeploymentFile(fileName: string){
    console.log('fileSystemName',fileName) ;
    this.kmservice.downloadDeploymentFile(fileName)
      .subscribe( (response :any) => {
        this.toastr.success('File Downloaded Successfully', 'Done', { timeOut: 2000 });
        let blobtool5 = new Blob([response], { type: 'application/octet-stream' });
        fileSaver.saveAs(blobtool5, fileName);
      });

  }

  // open the dialog box
  openAddnewparamDialog(AlertOrUpdateOradd :any, legalListobj :any) {
    const dialogRef = this.dialog.open(clustringDialogadContentComponent, {
      data: { name: AlertOrUpdateOradd,  legalListobj }
    });
    dialogRef.afterClosed().subscribe((result :any) => {
      
      const deletee = 'delete';
      if (result) {
         if (result.operationType === deletee) {
          console.log(' deletee');
          this.removeSelectedRows();
        }

      } else {
        console.log(' no result');
      }
    });
  }
   //  remove all selected row
   removeSelectedRows() {
    const indexArray: number[] = [];
    const usermodelinfoids: number[] = [];
    this.selection.selected.forEach( (item :userModInfo) => {
      const index: number = this.data.findIndex( (d :any )=> d === item);
      indexArray.push(index);
      usermodelinfoids.push(item.id);
    });
    console.log(usermodelinfoids);

    this.busy = this.kmservice.delete('/deleteuserModelsInfo', usermodelinfoids).subscribe(
      (data: any) => {
        this.toastr.success('ORG Keywords data deleted successfully', 'Done', { timeOut: 2000 });
        // this.refreshcomponent();
        this.selection.selected.forEach((item : userModInfo) => {
          const index: number = this.data.findIndex( (d: any) => d === item);
          indexArray.push(index);
          usermodelinfoids.push(item.id);
          this.dataSource.data.splice(index, 1);
          this.dataSource = new MatTableDataSource<userModInfo>(this.dataSource.data);
          this.selection = new SelectionModel<userModInfo>(true, []);
          this.dataSource.paginator = this.paginator;

        });
        this.dataSource.sort = this.sort;
      }
      ,(error :any) => {
        this.toastr.error(error.message, 'Error', { timeOut: 4000 });
        console.log('error g', error);
      }
    );
  }


}


@Component({
  selector: 'app-clustring-dialogad-content',
  templateUrl: 'clustring-dialog-contents/clustringPopup.html',
})
export class clustringDialogadContentComponent {
  updateorgketword = new FormControl();
  constructor( public toastr: ToastrService,
    public dialogRef: MatDialogRef<clustringDialogadContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  DeleteRows() {
    const NewReturnedObjFromDialog: DataReturnedObjFromDialog = { operationType: 'delete', datasourceIndex: 0, userModInfoObj: {} as userModInfo };
   console.log('', NewReturnedObjFromDialog);
    this.dialogRef.close(NewReturnedObjFromDialog);
  }
}
