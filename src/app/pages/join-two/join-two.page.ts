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

  async handleSubmit():Promise<void>{
    if(this.validationService.validateEmail(this.email) &&
       this.validationService.validatePassword(this.password) &&
       this.validationService.validateEqualPasswords(this.password, this.repeatedPassword)){
        const resp = await this.userService.login(this.email)
        if(resp){
          this.toastService.presentToast('Account created, welcome to the team!', 3500, 'success');
          this.redirectTo('/tabs/messages');
        }
       }
  }
  redirectTo(url: string): void {
    this._router.navigateByUrl(url);
  }

}
