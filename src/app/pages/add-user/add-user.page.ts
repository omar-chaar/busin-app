import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DepartamentService } from 'src/app/services/departament/departament.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Departament } from 'src/model/classes/Departament';
import { User } from 'src/model/classes/User';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  @Input() user: User;
  selectedDepartment: Departament;
  departments: Departament[];
  admin: boolean = false;
  position: string;
  code: string;

  constructor(private modalController: ModalController, private departmentService: DepartamentService,
    private validationService: ValidationService, private toastService: ToastService,
    private userService: UserService) {
    this.departments = this.departmentService.getAllDepartaments();
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
      this.validationService.validateLength('Position', this.position, 30, 2)) {
      this.userService.generateToken(this.selectedDepartment.id, this.position, this.admin).subscribe(
        (response) => {
          this.toastService.presentToast(response.response, 5000, 'success');
          this.code = response.data;
        },
        (error) => {
          this.toastService.presentToast('Error generating code. Try again later.', 2500, 'danger');
        }
      );
    }
  }

}
