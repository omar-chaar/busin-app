import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {

  email: string
  password: string

  constructor(private router: Router, private validationService: ValidationService,
    private userService: UserService, private toastService: ToastService) { }

  ngOnInit() {
  }

  handleSubmit():void {
    if(!this.validationService.validateEmail(this.email)) return 
    if(!this.validationService.validatePassword(this.password)) return 
    this.userService.login(this.email, this.password).subscribe(
      (resp) => {
        if(resp){
          this.toastService.presentToast('Login successful', 4000, 'success');
          console.log(resp)
          this.redirectTo('/');
        }
      },
      (err) => {
        this.toastService.presentToast(err.error.error, 4500, 'danger');
        this.toastService.presentToast(err.error.error, 4500, 'danger');
      }
    );
  }

  redirectTo(url: string):void{
    this.router.navigateByUrl(url);
  }
}
