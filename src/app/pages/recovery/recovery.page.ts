import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {

  email: string

  constructor(private router: Router, private validationService: ValidationService) { }

  ngOnInit() {
  }

  handleSubmit():void {
    if(!this.validationService.validateEmail(this.email)) return
    console.log('email sent!')
    this.router.navigateByUrl('/user-login');
  }

  goBack():void{
    this.router.navigateByUrl('/user-login');
  }

}
