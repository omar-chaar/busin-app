import { Injectable } from '@angular/core';
import { User } from 'src/model/classes/User';
import { Departament } from 'src/model/classes/Departament';
import { DepartamentService } from '../departament/departament.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersPerRequest: number = 10;

  currentUser: User;

  fakeDb: User[];

  constructor(private departamentService: DepartamentService) {
    this.fakeDb = [
      new User(0, 'Omar', 'Chaar', 'Fullstack Developer', 'omar@gmail.com', '...', this.departamentService.getDepartament(0), false),
      new User(1, 'Gabriel', 'Nunes', 'Front-end Developer', 'gabriel@gmail.com', '...', this.departamentService.getDepartament(0), false),
      new User(2, 'Ahmed', 'Hassan', 'Senior Developer', 'ahmed@gmail.com', '...', this.departamentService.getDepartament(0), false),
      new User(3, 'Omar', 'El Khoury', 'Junior Developer', 'omark@gmail.com', '...', this.departamentService.getDepartament(0), false),
      new User(4, 'Marcell', 'da Silva', 'Accountant', 'marcell@gmail.com', '...', this.departamentService.getDepartament(2), false),
      new User(5, 'Cliff', 'Gilmore', 'Influencer', 'cliff@gmail.com', '...', this.departamentService.getDepartament(1), true),
      new User(6, 'Ike', 'Mcmahon', 'Salesman', 'ike@gmail.com', '...', this.departamentService.getDepartament(3), false),
      new User(7, 'Coley', 'Frey', 'Stockist', 'coley@gmail.com', '...', this.departamentService.getDepartament(5), false),
      new User(8, 'Valentine', 'Lindsey', 'Driver', 'valetine@gmail.com', '...', this.departamentService.getDepartament(4), false),
    ]
   }

  getUser(id: number): User{
    return this.fakeDb.filter((user: User) => user.id === id)[0];
  }

  getUsers():User[]{
    return this.fakeDb
  }

  getUsersPagination(page: number):User[]{
    return this.fakeDb.slice((page - 1) * this.usersPerRequest, page * this.usersPerRequest);
  }

  getUsersByDepartament(departament: Departament):User[]{
    return this.fakeDb.filter(user => user.departament.id === departament.id)
  }

  async login(email: string):Promise<boolean>{
    let user: User;
    const contains = this.fakeDb.reduce((previous, current):boolean => {
      if(previous) return true
      if(current.email === email){
        user = current;
        return true
      }
      return false
    }, false)

    if(contains){
      this.currentUser = user;
      return true
    }
    return false
  }

  logout():boolean{
    this.currentUser = null;
    return true
  }

  async deleteUser(user: User):Promise<boolean>{
    const index = this.fakeDb.indexOf(user);
    this.fakeDb.splice(index, 1);
    return true;
  }

  async alterUser(editUser: User):Promise<boolean>{
    this.fakeDb.forEach((user:User) => {
      if(user.id === editUser.id){
        user = editUser
      }
    })
    return true
  }


}
