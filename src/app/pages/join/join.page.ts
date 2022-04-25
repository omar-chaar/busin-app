import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss'],
})
export class JoinPage implements OnInit {

  code: string;

  constructor(private router: Router, private toastService: ToastService,
    private validationService: ValidationService, private userService: UserService) { }

  ngOnInit() {
  }

  async handleSubmit(): Promise<void> {
    if (this.validationService.validateLength('Name', this.code, undefined, 1)) {
      const resp = await this.userService.login('gabriel@gmail.com')
      if (resp) {
        this.toastService.presentToast('Welcome to the team! ;)', 3000, 'success')
        this.router.navigateByUrl('/tabs/messages')
      }
    }
  }

  redirectTo(url: string): void {
    this.router.navigateByUrl(url);
  }

}
