import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {

  email: string

  constructor(private router: Router, private validationService: ValidationService, private toastService: ToastService) { }

  ngOnInit() {
  }

  handleSubmit():void {
    if(!this.validationService.validateEmail(this.email)) return
    this.toastService.presentToast("Recovery e-mail sent to " + this.email + " successfully", 3000, "success");
    this.router.navigateByUrl('/user-login');

  }

  goBack():void{
    this.router.navigateByUrl('/user-login');
  }

}
