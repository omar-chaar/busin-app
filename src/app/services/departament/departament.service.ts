import { Injectable } from '@angular/core';
import { Company } from 'src/model/classes/Company';
import { Departament } from 'src/model/classes/Departament';



@Injectable({
  providedIn: 'root'
})
export class DepartamentService {

  deptsPerRequest = 4
  company: Company;
  fakeDb: Departament[];

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

}
