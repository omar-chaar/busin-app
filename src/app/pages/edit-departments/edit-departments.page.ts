import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AddDepartmentPage } from '../add-department/add-department.page';
import { ChatGroupService } from 'src/app/services/chat-group/chat-group.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { Department } from 'src/model/classes/Department';
import { User } from 'src/model/classes/User';

export type EditDepartment = {
  department: Department,
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
    private departmentService: DepartmentService, private toastService: ToastService,
    private actionSheetCtrl: ActionSheetController, private chatGroupService: ChatGroupService,
    private modalController: ModalController) {


    let deptos: Department[] | EditDepartment[] = this.departmentService.departments;
    deptos = deptos.map(department => {
      return {
        department: department,
        edit: false
      }
    })

    this.departments = deptos;

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

        this.departmentService.updateDepartment(this.text, department.department.department_id).subscribe(
          (data: any) => {
            department.department.name = this.text;
            this.toastService.presentToast('Department renamed successfully', 3000, 'success');
            department.department.name = this.text;
            this.text = ''
            department.edit = false
          },
          (error: any) => {
            this.toastService.presentToast(error.error.error, 3000, 'danger');
          }
        )

      }
    }
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
