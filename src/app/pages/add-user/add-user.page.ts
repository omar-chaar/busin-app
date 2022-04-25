import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DepartamentService } from 'src/app/services/departament/departament.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Departament } from 'src/model/classes/Departament';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  selectedDepartment: Departament;
  departments: Departament[];
  admin: boolean = false;
  code: string;

  constructor(private modalController: ModalController, private departmentService: DepartamentService,
    private validationService: ValidationService, private toastService: ToastService) {
    this.departments = this.departmentService.getAllDepartaments();
   }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
  handleSubmit():void{
    if(this.validationService.validateSelectAndCheckbox('Department', this.selectedDepartment)){
      this.toastService.presentToast('Access code generated!', 3000, 'success');
      this.code = 'access-code-example'
    }
  }

}
