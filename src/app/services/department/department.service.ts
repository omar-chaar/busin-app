import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Company } from 'src/model/classes/Company';
import { department } from 'src/model/classes/department';
import { User } from 'src/model/classes/User';
import { UserService } from '../user/user.service';



@Injectable({
  providedIn: 'root'
})
export class departmentService {

  deptsPerRequest = 10;
  company: Company;
  fakeDb: department[];
  subject = new Subject;

  constructor() {
    this.company = new Company(0, 'Teste')
    this.fakeDb = [
      new department(0, 'IT department', this.company),
      new department(1, 'Marketing', this.company),
      new department(2, 'Accounting', this.company),
      new department(3, 'Sales', this.company),
      new department(4, 'Logistics', this.company),
      new department(5, 'Stock department', this.company),
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

  getdepartments(page:number):department[]{
    return this.fakeDb.filter((department: department, index: number) => {
      return this.deptsPerRequest*page >= index+1 && this.deptsPerRequest*page - this.deptsPerRequest < index+1 // for testing pagination
    })
  }

  getAlldepartments():department[]{
    return this.fakeDb;
  }

  getdepartment(id: number):department{
    return this.fakeDb.filter(department => department.id === id)[0];
  }

  async deleteDepartment(department: department, users: User[]):Promise<boolean>{
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

  async createDepartment(name: string):Promise<department>{
    const newDepartment = new department(this.fakeDb.length, name, this.company);
    this.fakeDb.push(newDepartment);
    this.subject.next(newDepartment)
    return newDepartment
  }

  onChange(): Observable<any> {
    return this.subject.asObservable()
  }
}
