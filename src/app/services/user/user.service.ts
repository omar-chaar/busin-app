import { Injectable } from '@angular/core';
import { User } from 'src/model/classes/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from 'src/model/classes/Department';
import { DepartmentService } from '../department/department.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersPerRequest: number = 10;
  code: string;
  headers: { 'Content-Type': 'application/json' };

  currentUser: User;
  companyName: string;

  constructor(private departmentService: DepartmentService, private http: HttpClient) {

  }

  logout(): boolean {
    this.currentUser = null;
    return true
  }

  generateToken(name: string, surname: string, departamentId: number, position: string, admin: boolean): Observable<any> {
    const body = { name, surname, departamentId, position, admin };
    const url = `${environment.apiUrl}/user/generate-code`;
    return this.http.post(url, body, { headers: this.headers });
  }

  validateToken(code: string): Observable<any> {
    const url = `${environment.apiUrl}/user/validate-code?token=${code}`;
    return this.http.get(url);
  }

  createAccount(email: string, password: string): Observable<any> {
    const url = `${environment.apiUrl}/user/create-user`;
    const body = { email, password, code: this.code };
    return this.http.post(url, body, { headers: this.headers });
  }

  createCompany(name: string, surname: string, email: string, password: string, position: string): Observable<any> {
    const url = `${environment.apiUrl}/company/create`;
    const body = { name, email, surname, password, position, companyName: this.companyName };
    return this.http.post(url, body, { headers: this.headers });
  }

  login(email: string, password: string): Observable<any> {
    const url = `${environment.apiUrl}/user/login`;
    const body = { email, password };
    return this.http.post(url, body, { headers: this.headers });
  }

}
