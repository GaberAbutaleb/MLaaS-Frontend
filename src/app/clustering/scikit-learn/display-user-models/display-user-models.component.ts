import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { KmeansService } from '../kmeans/kmeans.service';
import { SelectionModel } from '@angular/cdk/collections';
export interface userModInfo {
  id:number;
  model_Category: string;
  deployment_Model_Name: string;
  model_used: string;
  create_date: any;
  username: string;
  Model_Output_File_Name: string;
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

  constructor(private http: HttpClient, public toastr: ToastrService, public router: Router, public kmservice:KmeansService) { }

  ngOnInit(): void {
    var modelCat= 'clustring';
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

}
