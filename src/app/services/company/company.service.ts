import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/model/classes/Company';
import { User } from 'src/model/classes/User';
import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DepartmentService } from '../department/department.service';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  company: Company; 
  companyName: string;

  constructor(private http:HttpClient, private userService: UserService, private departmentService: DepartmentService) 
  {
    
  }

  setCompany(user: User):void{
    this.getCompany(user.department_id).subscribe((data:any) => {  this.company = data.response[0];
      this.departmentService.setDepartments(data.response[0].company_id);
      });
  }

  getCompany(id: number): Observable<Company> {
    const url = `${environment.apiUrl}/company/get-department/${id}`;
    return this.http.get<Company>(url);
    
  }

  createCompany(name: string, surname: string, email: string, password: string, position: string): Observable<any> {
    const url = `${environment.apiUrl}/company/create`;
    const headers = {'Content-Type': 'application/json'};
    const body = { name, email, surname, password, position, companyName: this.companyName };
    return this.http.post(url, body, { headers: headers });
  }

  getId(): number{
    return this.company.company_id;
  }

  getName(): string{
    return this.company.name;
  }

}
