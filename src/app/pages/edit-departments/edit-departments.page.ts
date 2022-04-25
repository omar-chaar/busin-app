import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AddDepartmentPage } from '../add-department/add-department.page';
import { ChatGroupService } from 'src/app/services/chat-group/chat-group.service';
import { DepartamentService } from 'src/app/services/departament/departament.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { Departament } from 'src/model/classes/Departament';
import { User } from 'src/model/classes/User';

export type EditDepartment = {
  department: Departament,
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
    private departmentService: DepartamentService, private toastService: ToastService,
    private actionSheetCtrl: ActionSheetController, private chatGroupService: ChatGroupService,
    private modalController: ModalController) {
    this.user = this.userService.currentUser;
    const deptos = this.departmentService.getAllDepartaments().map((depto): EditDepartment => {
      return {
        department: depto,
        edit: false
      }
    });
    this.departments.push(...deptos);
  }

  ngOnInit() {

  }

  switchEdit(departament: EditDepartment): void {
    departament.edit = !departament.edit;
  }

  async confirmEdit(departament: EditDepartment): Promise<void> {
    if (this.text.length > 1) {
      const actionSheet = await this.actionSheetCtrl.create({
        header: `Rename "${departament.department.name}" to "${this.text}"?`,
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
        departament.department.name = this.text
      }
    }
    this.text = ''
    departament.edit = false
  }

  async confirmDelete(departament: EditDepartment): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `Are you sure you want to delete "${departament.department.name}"?`,
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
      const users = this.userService.getUsersByDepartament(departament.department);
      const resp = await this.departmentService.deleteDepartment(departament.department, users);
      if(resp){
        await this.chatGroupService.deleteGroup(departament.department);
        this.toastService.presentToast('Department deleted!', 3000, 'success')
        const index = this.departments.indexOf(departament);
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
