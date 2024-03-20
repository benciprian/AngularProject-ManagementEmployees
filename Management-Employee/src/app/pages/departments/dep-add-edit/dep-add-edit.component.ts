import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { DepartmentsService } from 'src/app/services/departments.service';


@Component({
  selector: 'app-dep-add-edit',
  templateUrl: './dep-add-edit.component.html',
  styleUrls: ['./dep-add-edit.component.scss'],
})
export class DepAddEditComponent implements OnInit {
  depForm: FormGroup;
  
  constructor(
    private _fb: FormBuilder,
    private _depService: DepartmentsService,
    private _dialogRef: MatDialogRef<DepAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.depForm = this._fb.group({
      nameDepartments: '',  
    });
  }

  ngOnInit(): void {
    this.depForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.depForm.valid) {
      if (this.data) {
        this._depService
          .updateDepartments(this.data.id, this.depForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Departments detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._depService.addDepartments(this.depForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Departments added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
