import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Company } from 'src/model/classes/Company';
import { Department } from 'src/model/classes/Department';
import { User } from 'src/model/classes/User';
import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  company: Company;  

  constructor(private http:HttpClient, userService: UserService) 
  {
    this.getCompany(userService.currentUser.department_id).subscribe(data => {  this.company = data; });
   }

  getCompany(id: number): Observable<Company> {
    const url = `${environment.apiUrl}/company/get-department/${id}`;
    return this.http.get<Company>(url);
    
  }

  getId(): number{
    return this.company.id;
  }

  getName(): string{
    return this.company.name;
  }

}
