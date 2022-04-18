import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {

  email: string
  password: string

  constructor(private router: Router, private validationService: ValidationService) { }

  ngOnInit() {
  }

  handleSubmit():void {
    if(!this.validationService.validateEmail(this.email)) return 
    if(!this.validationService.validatePassword(this.password)) return 
    console.log('logged in!')
    this.router.navigateByUrl('/tabs/messages')
  }

  goToRecovery():void{
    this.router.navigateByUrl('/recovery')
  }
}
