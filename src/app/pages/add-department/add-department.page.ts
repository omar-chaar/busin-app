import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ChatGroupService } from 'src/app/services/chat-group/chat-group.service';
import { departmentService } from 'src/app/services/department/department.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { EditDepartment } from '../edit-departments/edit-departments.page';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.page.html',
  styleUrls: ['./add-department.page.scss'],
})
export class AddDepartmentPage implements OnInit {

  @Input() departments: EditDepartment[];
  name: string;

  constructor(private modalController: ModalController, private validationService: ValidationService,
    private departmentService: departmentService, private toastService: ToastService,
    private chatGroupService: ChatGroupService, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
  }

  dismiss(): void {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async handleSubmit(): Promise<void> {
    const resp = await this.departmentService.createDepartment(this.name);
    await this.chatGroupService.createGroup(resp);
    this.departments.push({
      department: resp,
      edit: false
    });
    this.toastService.presentToast('Department created!', 3000, 'success');
    this.dismiss();
  }

  async confirmCreate(): Promise<void> {
    if (this.validationService.validateLength('Department', this.name, 50, 2)) {
      const actionSheet = await this.actionSheetCtrl.create({
        header: `Create "${this.name}"?`,
        buttons: [
          {
            text: 'Create',
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

}
