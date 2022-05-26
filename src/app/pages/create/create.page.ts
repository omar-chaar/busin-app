import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { ActionSheetController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { CompanyService } from 'src/app/services/company/company.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  name: string;

  constructor(private router: Router,
    private validationService: ValidationService, private actionSheetCtrl: ActionSheetController,
    private companyService: CompanyService) { }

  ngOnInit() {
  }

  handleSubmit(): void{
    if (this.validationService.validateLength('Name', this.name, 50)) {
      this.canDismiss()
    }
  }

  redirectTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  async canDismiss():Promise<void> {
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
      this.companyService.companyName = this.name;
      this.redirectTo('/create-owner')      
    }
  }

}
