import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/services/user/user.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CompanyService } from 'src/app/services/company/company.service';

import { Department } from 'src/model/classes/Department';
import { User } from 'src/model/classes/User';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  userEditing: User = new User(0, '', '', '', '', '', 0, false, false, '');
  department: Department;
  departments: Department[] = [];
  userFullName: string = '';
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private departmentService: DepartmentService,
    private companyService: CompanyService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.userService.getUserById(id).subscribe((resp) => {
      this.userEditing = new User(
        id,
        resp.data.name,
        resp.data.surname,
        resp.data.position,
        resp.data.email,
        resp.data.profile_picture,
        resp.data.department_id,
        resp.data.is_adm,
        resp.data.is_owner
      );
      this.userFullName = this.userEditing.name + ' ' + this.userEditing.surname;
      this.departmentService
        .getDepartment(this.userEditing.department_id)
        .subscribe((resp) => {
          this.department = new Department(
            resp.data.department_id,
            resp.data.name,
            resp.data.company_id
          );
        });
    });
    this.departmentService
      .getDepartments(this.companyService.company.company_id)
      .subscribe((resp) => {
        this.departments = resp.data;
      });
  }

  redirectTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  handleSubmit(): void {
    if(this.userEditing.owner) this.userEditing.admin = true;
    this.userService.editUser(this.userEditing).subscribe(
      (resp) => {
        this.toastService.presentToast('User edited successfully', 3000, 'success');
        this.router.navigateByUrl('/profile/' + this.userEditing.id);
      }
    );
  }
}