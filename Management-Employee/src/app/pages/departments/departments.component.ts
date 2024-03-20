import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';
import { DepAddEditComponent } from './dep-add-edit/dep-add-edit.component';
import { DepartmentsService } from 'src/app/services/departments.service';


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nameDepartments',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _depService: DepartmentsService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getDepartmentsList();
  }

  openAddEditDepForm() {
    const dialogRef = this._dialog.open(DepAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDepartmentsList();
        }
      },
    });
  }

  getDepartmentsList() {
    this._depService.getDepartmentsList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteDepartments(id: number) {
    this._depService.deleteDepartments(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Departments deleted!', 'done');
        this.getDepartmentsList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(DepAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDepartmentsList();
        }
      },
    });
  }
}
