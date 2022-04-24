import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { DepartamentService } from 'src/app/services/departament/departament.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { Departament } from 'src/model/classes/Departament';
import { User } from 'src/model/classes/User';

type EditDepartment = {
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
    private actionSheetCtrl: ActionSheetController) {
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
    // if(!this.user.admin){
    //   this.router.navigateByUrl('/tabs/messages')
    // }
  }

  switchEdit(departament: EditDepartment): void {
    departament.edit = !departament.edit;
  }

  async confirmEdit(departament: EditDepartment): Promise<void> {
    if (this.text.length > 1) {
      const actionSheet = await this.actionSheetCtrl.create({
        header: `Change "${departament.department.name}" to "${this.text}"?`,
        buttons: [
          {
            text: 'Change',
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
        this.toastService.presentToast('Department deleted!', 3000, 'success')
      }else{
        this.toastService.presentToast('Remove all members from the department before deleting it!', 7000, 'danger')
      }
    }
    this.text = ''
    departament.edit = false
  }

  redirectTo(url: string): void {
    this.router.navigateByUrl(url)
  }

}
