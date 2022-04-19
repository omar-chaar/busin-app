import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  name: string;

  constructor(private router: Router, private toastService: ToastService, 
    private validationService: ValidationService) { }

  ngOnInit() {
  }

  handleSubmit():void{
    if(this.validationService.validateLength('Name', this.name, 50)){
      this.toastService.presentToast('Welcome to your new company!', 5000, 'success')
      this.router.navigateByUrl('/tabs/messages')
    }
  }

  redirectTo(url: string):void {
    this.router.navigateByUrl(url);
  }

}
