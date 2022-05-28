import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
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

  //TODO: SCHEDULE

  constructor(private modalController: ModalController, private departmentService: DepartmentService,
    private validationService: ValidationService, private toastService: ToastService,
    private userService: UserService, private actionSheetCtrl: ActionSheetController) {

  }

  //Initialization and destroy functions

  ngOnInit() {
    this.departments = this.departmentService.departments.filter(department => department.name !== 'Owner');
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async canDismiss(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `Code generated: ${this.code}. Click to copy.`,
      buttons: [
        {
          text: 'Copy',
          role: 'destructive'
        }
      ]
    });

    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();

    if (role === 'destructive') {

      function copyToClipBoard(item:string) {
        document.addEventListener('copy', (e: ClipboardEvent) => {
          e.clipboardData.setData('text/plain', (item));
          e.preventDefault();
          document.removeEventListener('copy', null);
        });
        document.execCommand('copy');
      }
    
      copyToClipBoard(this.code);
      this.toastService.presentToast('Code copied to clipboard', 2000, 'success');
      this.dismiss();
    }
  }

  //Submit Functions

  handleSubmit(): void {
    if (this.validationService.validateSelectAndCheckbox('Department', this.selectedDepartment) &&
      this.validationService.validateLength('Position', this.position, 30, 2) &&
      this.validationService.validateLength('Name', this.name, 30, 2) &&
      this.validationService.validateLength('Surname', this.surname, 30, 2)) {
      this.userService.generateToken(this.name, this.surname, this.selectedDepartment.department_id, this.position, this.admin).subscribe(
        (response) => {
          this.code = response.data;
          this.canDismiss();
        },
        (error) => {
          this.toastService.presentToast(error.error.error, 3500, 'danger');
        }
      );
    }
  }
}
