import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Company } from 'src/model/classes/Company';
import { Department } from 'src/model/classes/Department';
import { User } from 'src/model/classes/User';
import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  deptsPerRequest = 10;
  company: Company;
  fakeDb: Department[];
  subject = new Subject;
  companyId = 1;
  headers = { 'Content-Type': 'application/json' };

  constructor( private httpClient: HttpClient) {
    this.company = new Company(0, 'Teste')
    this.fakeDb = [
      new Department(0, 'IT department', this.company),
      new Department(1, 'Marketing', this.company),
      new Department(2, 'Accounting', this.company),
      new Department(3, 'Sales', this.company),
      new Department(4, 'Logistics', this.company),
      new Department(5, 'Stock department', this.company),
    ]
    //   [
    //     {
    //       id: 0,
    //       name: 'IT department',
    //       company: this.company
    //     },
    //     {
    //       id: 1,
    //       name: 'Marketing',
    //       company: this.company
    //     },
    //     {
    //       id: 2,
    //       name: 'Accounting',
    //       company: this.company
    //     },
    //     {
    //       id: 3,
    //       name: 'Sales',
    //       company: this.company
    //     },
    //     {
    //       id: 4,
    //       name: 'Logistics',
    //       company: this.company
    //     },
    //     {
    //       id: 5,
    //       name: 'Stock department',
    //       company: this.company
    //     }
    // ]
   }

  getdepartments(page:number):Department[]{
    return this.fakeDb.filter((department: Department, index: number) => {
      return this.deptsPerRequest*page >= index+1 && this.deptsPerRequest*page - this.deptsPerRequest < index+1 // for testing pagination
    })
  }

  getAlldepartments():Department[]{
    return this.fakeDb;
  }

  getdepartment(id: number):Department{
    return this.fakeDb.filter(department => department.id === id)[0];
  }

  async deleteDepartment(department: Department, users: User[]):Promise<boolean>{
    if(users.length === 0){
      const deletedDepartment = {...department};
      const index = this.fakeDb.indexOf(department)
      this.fakeDb.splice(index, 1);
      this.subject.next(deletedDepartment)
      return true
    }else{
      return false
    }
  }

  

  async createDepartment(name: string):Promise<Department>{
    const newDepartment = new Department(this.fakeDb.length, name, this.company);
    this.fakeDb.push(newDepartment);
    this.subject.next(newDepartment)
    return newDepartment
  }

  postCreateDepartment(name: string): Observable<any> {
    const url = `${environment.apiUrl}/department/create`;
    const body = { name, owner: this.companyId };
    return this.httpClient.post(url, body, {headers: this.headers});
  }

  updateDepartment(id: number, name: string): Observable<any> {
    const url = `${environment.apiUrl}/department/update`;
    const body = { id, name };
    return this.httpClient.put(url, body, {headers: this.headers});
  }

  getAllDepartmentsDb(): Observable<any> {
    const url = `${environment.apiUrl}/department/get-all`;
    return this.httpClient.get(url, {headers: this.headers});
  }

  deleteDepartmentDb(id: number):Observable<any>{
    const url = `${environment.apiUrl}/department/delete/${id}`;
    return this.httpClient.delete(url, {headers: this.headers});
  }

  onChange(): Observable<any> {
    return this.subject.asObservable()
  }
}
