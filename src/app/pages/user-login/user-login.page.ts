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

  async handleSubmit():Promise<void> {
    if(!this.validationService.validateEmail(this.email)) return 
    if(!this.validationService.validatePassword(this.password)) return 
    const resp = await this.userService.login(this.email)
    if(resp){
      this.router.navigateByUrl('/tabs/messages');
    }else{
      this.toastService.presentToast('Invalid credentials!', 3000, 'warning');
    }
  }

  redirectTo(url: string):void{
    this.router.navigateByUrl(url);
  }
}
