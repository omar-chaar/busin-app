import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company/company.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-create-owner',
  templateUrl: './create-owner.page.html',
  styleUrls: ['./create-owner.page.scss'],
})
export class CreateOwnerPage implements OnInit {

  email = '';
  password = '';
  repeatedPassword = '';
  name='';
  surname='';
  position='';

  constructor(private validationService: ValidationService, private _router: Router,
    private toastService: ToastService, private companyService: CompanyService) { }

  ngOnInit() {
  }

  handleSubmit():void{
    if(this.validationService.validateEmail(this.email) &&
       this.validationService.validatePassword(this.password) &&
       this.validationService.validateEqualPasswords(this.password, this.repeatedPassword) &&
       this.validationService.validateLength('Name', this.name, 40, 1) &&
       this.validationService.validateLength('Surname', this.surname, 40, 1) &&
       this.validationService.validateLength('Position', this.position, 40, 1)){ 
        this.createAccount();
       }
  }

  createAccount():void{
    this.companyService.createCompany(this.name, this.surname, this.email, this.password,
      this.position).subscribe(
      (resp) => {
        if(resp){
          this.toastService.presentToast('Company created successfully', 4000, 'success');
          this.redirectTo('/login');
        }
      },
      (err) => {
        console.log(err)
        this.toastService.presentToast(err.error.error, 4500, 'danger');
      }
    );
  }

  redirectTo(url: string): void {
    this._router.navigateByUrl(url);
  }

}
