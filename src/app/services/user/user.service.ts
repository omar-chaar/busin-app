import { Injectable } from '@angular/core';
import { IDepartament } from '../departament/departament.service';

export interface IUser{
  id: number,
  name: string,
  position: string,
  departament?: number, //Change later
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersPerRequest: number = 4;

  currentUser: IUser

  fakeDb: IUser[] = [
    {
      id: 0,
      name: 'Omar Chaar',
      position: 'Fullstack Developer',
      departament: 0,
    },
    {
      id: 1,
      name: 'Gabriel Nunes',
      position: 'Front-end Developer',
      departament: 0,
    },
    {
      id: 2,
      name: 'Ahmed Hassan',
      position: 'Senior Developer',
      departament: 0,
    },
    {
      id: 3,
      name: 'Omar El Khoury',
      position: 'Junior Developer',
      departament: 0,
    },
    {
      id: 4,
      name: 'Marcell da Silva',
      position: 'Accountant',
      departament: 2
    },
    {
      id: 5,
      name: 'Omar',
      position: 'Putin supporter',
      departament: 1
    },
    {
      id: 6,
      name: 'Someone',
      position: 'Manager or Menager idk how to spell it',
      departament: 3
    },
    {
      id: 7,
      name: 'Tired',
      position: 'Of typing users',
      departament: 5
    },
    {
      id: 8,
      name: 'Last One',
      position: 'Last of the array',
      departament: 4
    }
  ];

  constructor() {
    this.currentUser = this.getUser(5) // troque o parametro para mudar o usuário
   }

  getUser(id: number): IUser{
    return this.fakeDb.filter((user: IUser) => user.id === id)[0];
  }

  getUsers():IUser[]{
    return this.fakeDb
  }

  getUsersByDepartament(departament: IDepartament):IUser[]{
    return this.fakeDb.filter(user => user.departament === departament.id)
  }


}
