import { Injectable } from '@angular/core';
import { User } from 'src/model/classes/User';
import { Departament } from 'src/model/classes/Departament';
import { DepartamentService } from '../departament/departament.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersPerRequest: number = 4;

  currentUser: User

  fakeDb: User[];

  constructor(private departamentService: DepartamentService) {
    this.fakeDb = [
      new User(0, 'Omar', 'Chaar', 'Fullstack Developer', 'omar@gmail.com', '...', this.departamentService.getDepartament(0)),
      new User(1, 'Gabriel', 'Nunes', 'Front-end Developer', 'gabriel@gmail.com', '...', this.departamentService.getDepartament(0)),
      new User(2, 'Ahmed', 'Hassan', 'Senior Developer', 'ahmed@gmail.com', '...', this.departamentService.getDepartament(0)),
      new User(3, 'Omar', 'El Khoury', 'Junior Developer', 'omark@gmail.com', '...', this.departamentService.getDepartament(0)),
      new User(4, 'Marcell', 'da Silva', 'Accountant', 'marcell@gmail.com', '...', this.departamentService.getDepartament(2)),
      new User(5, 'Cliff', 'Gilmore', 'Influencer', 'cliff@gmail.com', '...', this.departamentService.getDepartament(1)),
      new User(6, 'Ike', 'Mcmahon', 'Salesman', 'ike@gmail.com', '...', this.departamentService.getDepartament(3)),
      new User(7, 'Coley', 'Frey', 'Stockist', 'coley@gmail.com', '...', this.departamentService.getDepartament(5)),
      new User(8, 'Valentine', 'Lindsey', 'Driver', 'valetine@gmail.com', '...', this.departamentService.getDepartament(4)),
    ]
    this.currentUser = this.getUser(5) // troque o parametro para mudar o usuário

   }

  getUser(id: number): User{
    return this.fakeDb.filter((user: User) => user.id === id)[0];
  }

  getUsers():User[]{
    return this.fakeDb
  }

  getUsersByDepartament(departament: Departament):User[]{
    return this.fakeDb.filter(user => user.departament.id === departament.id)
  }


}
