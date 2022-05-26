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

  handleSubmit(): void {
    if (this.validationService.validateLength('Code', this.code, undefined, 1)) {
      this.userService.validateToken(this.code).subscribe(
        (resp) => {
          if (resp) {
            this.userService.code = this.code;
            this.redirectTo('/join-two');
          }
        },
        (err) => {
          this.toastService.presentToast('Invalid code!', 3500, 'danger');
        }
      );
    }
  }

  redirectTo(url: string): void {
    this.router.navigateByUrl(url);
  }

}
