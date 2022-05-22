import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-join-two',
  templateUrl: './join-two.page.html',
  styleUrls: ['./join-two.page.scss'],
})
export class JoinTwoPage implements OnInit {

  email: string;
  password: string;
  repeatedPassword: string;

  constructor(private validationService: ValidationService, private toastService: ToastService, private _router: Router,
    private userService: UserService) { 
      
  }

  ngOnInit() {
  }

  handleSubmit():void{
    if(this.validationService.validateEmail(this.email) &&
       this.validationService.validatePassword(this.password) &&
       this.validationService.validateEqualPasswords(this.password, this.repeatedPassword)){
        this.createAccount();
       }
  }

  createAccount():void{
    this.userService.createAccount(this.email, this.password).subscribe(
      (resp) => {
        if(resp){
          this.toastService.presentToast('Account created successfully', 3000, 'success');
          this.redirectTo('/user-login');
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
