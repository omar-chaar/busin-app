import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DepartmentService } from 'src/app/services/department/department.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Department } from 'src/model/classes/Department';
import { User } from 'src/model/classes/User';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  @Input() user: User;
  selectedDepartment: Department;
  departments: Department[];
  admin: boolean = false;
  position: string;
  name: string;
  surname: string;
  code: string;
  //TODO: ADD CONSTRAINTS TO INPUTS SUCH AS LENGTH
  //TODO: SCHEDULE

  constructor(private modalController: ModalController, private departmentService: DepartmentService,
    private validationService: ValidationService, private toastService: ToastService,
    private userService: UserService) {
      const deptos = departmentService.departaments;
      this.departments = deptos.filter(department => department.name !== 'Owner');
    
  }
  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  handleSubmit(): void {
    if (this.validationService.validateSelectAndCheckbox('Department', this.selectedDepartment) &&
      this.validationService.validateLength('Position', this.position, 30, 2) &&
      this.validationService.validateLength('Name', this.name, 30, 2) &&
      this.validationService.validateLength('Surname', this.surname, 30, 2)) {
      this.userService.generateToken(this.name, this.surname, this.selectedDepartment.department_id, this.position, this.admin).subscribe(
        (response) => {
          this.toastService.presentToast(response.response, 5000, 'success');
          this.code = response.data;
        },
        (error) => {
          console.log(error)
          this.toastService.presentToast(error.error.error, 2500, 'danger');
        }
      );
    }
  }
}
