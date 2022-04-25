import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Company } from 'src/model/classes/Company';
import { Departament } from 'src/model/classes/Departament';
import { User } from 'src/model/classes/User';
import { UserService } from '../user/user.service';



@Injectable({
  providedIn: 'root'
})
export class DepartamentService {

  deptsPerRequest = 10;
  company: Company;
  fakeDb: Departament[];
  subject = new Subject;

  constructor() {
    this.company = new Company(0, 'Teste')
    this.fakeDb = [
      new Departament(0, 'IT Departament', this.company),
      new Departament(1, 'Marketing', this.company),
      new Departament(2, 'Accounting', this.company),
      new Departament(3, 'Sales', this.company),
      new Departament(4, 'Logistics', this.company),
      new Departament(5, 'Stock Departament', this.company),
    ]
    //   [
    //     {
    //       id: 0,
    //       name: 'IT Departament',
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
    //       name: 'Stock Departament',
    //       company: this.company
    //     }
    // ]
   }

  getDepartaments(page:number):Departament[]{
    return this.fakeDb.filter((departament: Departament, index: number) => {
      return this.deptsPerRequest*page >= index+1 && this.deptsPerRequest*page - this.deptsPerRequest < index+1 // for testing pagination
    })
  }

  getAllDepartaments():Departament[]{
    return this.fakeDb;
  }

  getDepartament(id: number):Departament{
    return this.fakeDb.filter(departament => departament.id === id)[0];
  }

  async deleteDepartment(department: Departament, users: User[]):Promise<boolean>{
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
  onDelete(): Observable<any> {
    return this.subject.asObservable()
  }
}
