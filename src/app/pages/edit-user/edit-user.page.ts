import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { DepartamentService } from 'src/app/services/departament/departament.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Departament } from 'src/model/classes/Departament';
import { User } from 'src/model/classes/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  @Input() user: User;
  @Input() profile: User;
  departments: Departament[];

  name: string;
  lastname: string;
  email: string;
  position: string;
  password: string;
  admin: boolean;
  department: Departament;

  constructor(private modalController: ModalController, private toastService: ToastService,
    private validationService: ValidationService, private departmentService: DepartamentService,
    private userService: UserService, private actionSheetCtrl: ActionSheetController) {
      this.departments = this.departmentService.getAllDepartaments();
     }

  ngOnInit() {
      this.name = this.profile.name;
      this.lastname = this.profile.surname;
      this.position = this.profile.position;
      this.email = this.profile.email;
      this.admin = this.profile.admin;
      this.department = this.profile.departament;
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async confirmAlter(): Promise<void> {
    if(this.validate()){
      const actionSheet = await this.actionSheetCtrl.create({
        header: `Are you sure you want to alter this user?`,
        buttons: [
          {
            text: 'Alter',
            role: 'destructive'
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
  
      await actionSheet.present();
  
      const { role } = await actionSheet.onDidDismiss();
  
      if (role === 'destructive') {
       this.handleSubmit();
      }
    }
  }

  validate():boolean{
    const validateName = this.validationService.validateLength('Name', this.name, 30, 2) &&
                         this.validationService.validateLength('Surname', this.lastname, 30, 2);
    const validateEmail = this.validationService.validateEmail(this.email);
    const validatePosition = this.validationService.validateLength('Position', this.position, 30, 2);
    const validateDepartment = this.validationService.validateSelectAndCheckbox('Department', this.department);

    if(validateName && validateEmail && validatePosition && validateDepartment){
      return true
    }

    return false
  }

  async handleSubmit(): Promise<void>{
    this.profile.name = this.name;
    this.profile.surname = this.lastname;
    this.profile.email = this.email;
    this.profile.position = this.position;
    this.profile.departament = this.department;
    this.profile.admin = this.admin;

    if(await this.userService.alterUser(this.profile)){
      this.toastService.presentToast('User successfully altered!', 3500, 'success');
      this.dismiss()
    }
  }

}
