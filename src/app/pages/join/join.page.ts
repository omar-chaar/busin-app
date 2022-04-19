import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss'],
})
export class JoinPage implements OnInit {

  code: string;

  constructor(private router: Router, private toastService: ToastService, 
    private validationService: ValidationService) { }

  ngOnInit() {
  }

  handleSubmit():void{
    if(this.validationService.validateLength('Name', this.code, undefined, 1)){
      this.toastService.presentToast('Welcome to the team! ;)', 5000, 'success')
      this.router.navigateByUrl('/tabs/messages')
    }
  }

  redirectTo(url: string):void {
    this.router.navigateByUrl(url);
  }

}
