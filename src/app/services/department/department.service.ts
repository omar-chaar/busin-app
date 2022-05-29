import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from 'src/model/classes/Department';
import { UserService } from '../user/user.service';



@Injectable({
  providedIn: 'root'
})
export class DepartmentService implements OnInit {


  departments: Department[];
  currentUserDepartment: Department;
  
  constructor(private http: HttpClient, private userService: UserService) {
    
  }


  ngOnInit(): void {
  }

  createDepartment(name: string, companyId: number): Observable<any> {
    const url = `${environment.apiUrl}/department/create`;
    const headers = { authorization: `Bearer ${this.userService.currentUser.token}`, 'Content-Type': 'application/json' };
    return this.http.post<any>(url, { name, companyId }, { headers: headers });
  }

  setDepartments(id: number): void {
    this.getDepartments(id).subscribe((data: any) => {
      this.departments = data.data;
    });
  }

  updateDepartment(name: string, id: number): Observable<any> {
    const url = `${environment.apiUrl}/department/update`;
    const headers = { authorization: `Bearer ${this.userService.currentUser.token}`, 'Content-Type': 'application/json' };
    const body = { name, department_id: id };
    return this.http.put<any>(url, body, { headers: headers });
  }

  getDepartments(id: number): Observable<any> {
    const url = `${environment.apiUrl}/department/get-departments/${id}`;
    const headers = { authorization: `Bearer ${this.userService.currentUser.token}` };
    return this.http.get<any>(url, { headers: headers });
  }

  getDepartment(id: number): Observable<any> {
    const url = `${environment.apiUrl}/department/get-department/${id}`;
    const headers = { authorization: `Bearer ${this.userService.currentUser.token}` };
    return this.http.get<any>(url, { headers: headers });
  }  

  setUserDepartment(department_id: number): void {
    const url = `${environment.apiUrl}/department/get-department/${department_id}`;
    const headers = { authorization: `Bearer ${this.userService.currentUser.token}` };
    this.http.get<any>(url, { headers: headers }).subscribe((data: any) => {    
      this.currentUserDepartment = data.data;
    });
    }
    /*
 //TODO: FIX THIS
  deleteDepartmentDb(id: number):Observable<any>{
    const url = `${environment.apiUrl}/department/delete/${id}`;
    return this.httpClient.delete(url, {headers: this.headers});
  }
  //TODO: check this
  onChange(): Observable<any> {
    return this.subject.asObservable()

  } */


}
