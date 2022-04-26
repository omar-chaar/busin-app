import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AddDepartmentPage } from '../add-department/add-department.page';
import { ChatGroupService } from 'src/app/services/chat-group/chat-group.service';
import { departmentService } from 'src/app/services/department/department.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { department } from 'src/model/classes/department';
import { User } from 'src/model/classes/User';

export type EditDepartment = {
  department: department,
  edit: boolean
}

@Component({
  selector: 'app-edit-departments',
  templateUrl: './edit-departments.page.html',
  styleUrls: ['./edit-departments.page.scss'],
})
export class EditDepartmentsPage implements OnInit {

  user: User;
  departments: EditDepartment[] = [];
  text: string;

  constructor(private router: Router, private userService: UserService,
    private departmentService: departmentService, private toastService: ToastService,
    private actionSheetCtrl: ActionSheetController, private chatGroupService: ChatGroupService,
    private modalController: ModalController) {
    this.user = this.userService.currentUser;
    const deptos = this.departmentService.getAlldepartments().map((depto): EditDepartment => {
      return {
        department: depto,
        edit: false
      }
    });
    this.departments.push(...deptos);
  }

  ngOnInit() {

  }

  switchEdit(department: EditDepartment): void {
    department.edit = !department.edit;
  }

  async confirmEdit(department: EditDepartment): Promise<void> {
    if (this.text.length > 1) {
      const actionSheet = await this.actionSheetCtrl.create({
        header: `Rename "${department.department.name}" to "${this.text}"?`,
        buttons: [
          {
            text: 'Confirm',
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
        this.toastService.presentToast('Department altered!', 3000, 'success')
        department.department.name = this.text
      }
    }
    this.text = ''
    department.edit = false
  }

  async confirmDelete(department: EditDepartment): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `Are you sure you want to delete "${department.department.name}"?`,
      buttons: [
        {
          text: 'Delete',
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
      const users = this.userService.getUsersBydepartment(department.department);
      const resp = await this.departmentService.deleteDepartment(department.department, users);
      if(resp){
        await this.chatGroupService.deleteGroup(department.department);
        this.toastService.presentToast('Department deleted!', 3000, 'success')
        const index = this.departments.indexOf(department);
        this.departments.splice(index, 1);
      }else{
        this.toastService.presentToast('Remove all members from the department before deleting it!', 7000, 'danger')
      }
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddDepartmentPage,
      cssClass: 'my-custom-class',
      componentProps: {
        departments: this.departments
      }
    });
    return await modal.present();
  }

  redirectTo(url: string): void {
    this.router.navigateByUrl(url)
  }

}
