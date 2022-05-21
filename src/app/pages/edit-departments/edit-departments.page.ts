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
    this.user = this.userService.currentUser;
    this.departmentService.getAllDepartmentsDb().subscribe(resp => {
      const deptos = resp.data.map((department: any): EditDepartment => {
        console.log(department)
        department = new Department(department.department_id, department.name, this.departmentService.company);
        return {
          department: department,
          edit: false
        }
      })
      this.departments.push(...deptos);
    }, err => {
      console.log(err)
      this.toastService.presentToast(err.error.error, 3000, 'danger');
    });
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
        console.log(department.department.id)
        this.departmentService.updateDepartment(department.department.id, this.text).subscribe(resp => {
          department.department.name = this.text;
          this.text = '';
          this.toastService.presentToast('Department altered!', 3000, 'success')
          department.edit = false;
        }, err => {
          this.toastService.presentToast(err.error.error, 3000, 'danger')
        })
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
      //const resp = await this.departmentService.deleteDepartment(department.department, users)
      const resp = this.departmentService.deleteDepartmentDb(department.department.id).subscribe(
        resp => {
          this.toastService.presentToast('Department deleted!', 3000, 'success');
          this.departments = this.departments.filter(dept => dept.department.id !== department.department.id);
        },
        err => {
          this.toastService.presentToast(err.error.error, 3000, 'danger')
      });
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
