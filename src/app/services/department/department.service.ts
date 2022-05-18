import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Company } from 'src/model/classes/Company';
import { Department } from 'src/model/classes/Department';
import { User } from 'src/model/classes/User';
import { UserService } from '../user/user.service';



@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  deptsPerRequest = 10;
  company: Company;
  fakeDb: Department[];
  subject = new Subject;

  constructor() {
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

  onChange(): Observable<any> {
    return this.subject.asObservable()
  }
}
