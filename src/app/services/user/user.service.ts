import { Injectable } from '@angular/core';
import { User } from 'src/model/classes/User';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersPerRequest: number = 10;
  code: string;
  headers: { 'Content-Type': 'application/json' };

  currentUser: User;

  subject = new Subject()

  constructor(private http: HttpClient) {

  }

  logout(): boolean {
    this.currentUser = null;
    if(localStorage){
      localStorage.removeItem('token');
    }
    return true
  }

  isLoaded(user: User):void{
    this.subject.next(this.currentUser);
  }

  generateToken(name: string, surname: string, departmentId: number, position: string, admin: boolean): Observable<any> {
    const body = { name, surname, departmentId, position, admin };
    const headers = { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.currentUser.token };
    const url = `${environment.apiUrl}/user/generate-code`;
    return this.http.post(url, body, { headers: headers });
  }

  validateToken(code: string): Observable<any> {
    const url = `${environment.apiUrl}/user/validate-code?token=${code}`;
    return this.http.get(url);
  }

  createAccount(email: string, password: string): Observable<any> {
    const url = `${environment.apiUrl}/user/create`;
    const body = { email, password, code: this.code };
    return this.http.post(url, body, { headers: this.headers });
  }

  login(email: string, password: string): Observable<any> {
    const url = `${environment.apiUrl}/user/login`;
    const body = { email, password };
    return this.http.post(url, body, { headers: this.headers });
  }

  getUserByToken(token: string): Observable<any> {
    const url = `${environment.apiUrl}/user/get-by-token`;
    const headers = { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + token };
    return this.http.get(url, { headers: headers });
  }

  getUsersByDepartment(departmentId: number): Observable<any> {
    const headers = {authorization: 'Bearer ' + this.currentUser.token};
    const url = `${environment.apiUrl}/user/get-by-department/${departmentId}`;
    return this.http.get(url, {headers: headers});
  }

  getUsersByCompany(companyId: number): Observable<User[]> {
    const headers = {authorization: 'Bearer ' + this.currentUser.token};
    const url = `${environment.apiUrl}/user/get-by-company/${companyId}`;
    return this.http.get<User[]>(url, {headers: headers});
  }


  getUserById(id: number): Observable<any> {
    const headers = {authorization: 'Bearer ' + this.currentUser.token};
    const url = `${environment.apiUrl}/user/get-user-data/${id}`;
    return this.http.get(url, {headers: headers});
  }

  setName(id: number, name: string, surname: string): Observable<any> {
    const headers = {authorization: 'Bearer ' + this.currentUser.token};
    const url = `${environment.apiUrl}/user/set-username/${id}`;
    const body = {name, surname};
    return this.http.put(url, body, {headers: headers});
  }

  editUser(user: User): Observable<any> {
    const headers = {authorization: 'Bearer ' + this.currentUser.token};
    const url = `${environment.apiUrl}/user/edit-user-data/${user.id}`;
    const body = {name: user.name, surname: user.surname, departmentId: user.department_id, position: user.position,
    admin: user.admin};
    return this.http.put(url, body, {headers: headers});
  }

  deleteUser(id: number): Observable<any> {
    const headers = {authorization: 'Bearer ' + this.currentUser.token};
    const url = `${environment.apiUrl}/user/delete/${id}`;
    return this.http.delete(url, {headers: headers});
  }

  onLoad(): Observable<any> {
    return this.subject.asObservable();
  }

}
