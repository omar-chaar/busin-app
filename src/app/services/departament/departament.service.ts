import { Injectable } from '@angular/core';

export interface IDepartament{
  id: number,
  name: string,
}

@Injectable({
  providedIn: 'root'
})
export class DepartamentService {

  deptsPerRequest = 4
  fakeDb: IDepartament[] = [
    {
      id: 0,
      name: 'IT Departament'
    },
    {
      id: 1,
      name: 'Marketing',
    },
    {
      id: 2,
      name: 'Accounting'
    },
    {
      id: 3,
      name: 'Sales'
    },
    {
      id: 4,
      name: 'Logistics'
    },
    {
      id: 5,
      name: 'Stock Departament'
    }
  ]

  constructor() { }

  getDepartaments(page:number):IDepartament[]{
    return this.fakeDb.filter((departament: IDepartament, index: number) => {
      return this.deptsPerRequest*page >= index+1 && this.deptsPerRequest*page - this.deptsPerRequest < index+1 // for testing pagination
    })
  }

  getDepartament(id: number):IDepartament{
    return this.fakeDb.filter(departament => departament.id === id)[0]
  }

}
