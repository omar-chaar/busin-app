import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ChatGroupService } from 'src/app/services/chat-group/chat-group.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Department } from 'src/model/classes/Department';
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
    private departmentService: DepartmentService, private toastService: ToastService,
    private chatGroupService: ChatGroupService, private actionSheetCtrl: ActionSheetController,
    private companyService: CompanyService) { }

//Initiation and destroy functions

  ngOnInit() {
  }

  dismiss(): void {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  //Submit functions

  handleSubmit(){
    if(this.validationService.validateLength('Nome', this.name, 40, 2)){
      this.departmentService.createDepartment(this.name, this.companyService.company.company_id).subscribe(
        (resp) => {
          this.toastService.presentToast('Department created', 2000, 'success');
          const department = new Department(resp.data.id, resp.data.name, resp.data.companyId);
          const editdepartment: EditDepartment = {department, edit: false};
          this.departments.push(editdepartment);
          this.dismiss();
        },
        (err) => {
          this.toastService.presentToast(err.error.error, 4500, 'danger');
        }
      );
    }  

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
