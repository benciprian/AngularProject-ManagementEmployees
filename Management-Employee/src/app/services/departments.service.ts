import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  constructor(private _http: HttpClient) {}

  addDepartments(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/departments', data);
  }

  updateDepartments(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/departments/${id}`, data);
  }

  getDepartmentsList(): Observable<any> {
    return this._http.get('http://localhost:3000/departments');
  }

  deleteDepartments(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/departments/${id}`);
  }
}