import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController} from '@ionic/angular';

import { ChatGroupService } from 'src/app/services/chat-group/chat-group.service';
import { departmentService } from 'src/app/services/department/department.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { department } from 'src/model/classes/department';
import { User } from 'src/model/classes/User';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  user: User;
  profile: User;
  departments: department[];

  name: string;
  lastname: string;
  email: string;
  position: string;
  password: string;
  admin: boolean;
  department: department;

  constructor(private toastService: ToastService, private activatedRoute: ActivatedRoute,
    private validationService: ValidationService, private departmentService: departmentService,
    private userService: UserService, private actionSheetCtrl: ActionSheetController, private location: Location, private router:Router, private chatGroupService: ChatGroupService) {

      this.departments = this.departmentService.getAlldepartments();
     }

  ngOnInit() {
    this.user = this.userService.currentUser;
    const id = +this.activatedRoute.snapshot.params['id'];
    const profileUser = this.userService.getUser(id);
    if(typeof profileUser === 'boolean'){
      this.router.navigateByUrl('/edit-users')
    }else{
      this.profile = profileUser;
      this.name = profileUser.name;
      this.lastname = profileUser.surname;
      this.position = profileUser.position;
      this.email = profileUser.email;
      this.admin = profileUser.admin;
      this.department = profileUser.department;
    }
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

  redirectTo(url: string):void{
    this.router.navigateByUrl(url)
  }

  async handleSubmit(): Promise<void>{
    if(this.profile.department !== this.department){
      await this.changeDepartments(this.profile.department, this.department);
    }
    this.profile.name = this.name;
    this.profile.surname = this.lastname;
    this.profile.email = this.email;
    this.profile.position = this.position;
    this.profile.department = this.department;
    this.profile.admin = this.admin;

    if(await this.userService.alterUser(this.profile)){
      this.toastService.presentToast('User successfully altered!', 3500, 'success');
      this.router.navigateByUrl('/edit-users')
    }
  }

  async changeDepartments(oldDepartment: department, newDepartment: department):Promise<boolean>{
    await this.chatGroupService.removeParticipant(oldDepartment.id, this.profile);
    await this.chatGroupService.addParticipant(newDepartment.id, this.profile);
    return true
  }

}
