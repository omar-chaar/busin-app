import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';
@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  emailRegex: RegExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  constructor(private toastService: ToastService) { }

 

  validateEmail(email: string): boolean {
    if (!email) {
      this.toastService.presentToast('E-mail field is empty!', 3000, 'danger');
      return false;
    }
    if (email.match(this.emailRegex))
      return true;
    this.toastService.presentToast('Invalid e-mail format!', 3000, 'danger');
    return false;

  }

  validatePassword(password: string): boolean {
    if(!password){
      this.toastService.presentToast('Password field is empty', 3000, 'danger');
      return false;
    }
    if (password.length >= 6)
      return true;
    this.toastService.presentToast('Password is too short!', 3000, 'danger');
    return false;

  }

  validateLength(field: string = 'Field', text: string, max:number=Infinity, min:number=0):boolean{
    if(!text){
      this.toastService.presentToast(field + ' is empty!', 3000, 'danger');
      return false
    }
    if(text.length < min){
      this.toastService.presentToast(field + ' is too short!', 3000, 'danger');
      return false
    }
    if(text.length > max){
      this.toastService.presentToast(field + ' is too long!', 3000, 'danger')
      return false
    }

    return true
  }

  validateSelectAndCheckbox(field: string = 'Field', value: any):boolean{
    if(!value){
      this.toastService.presentToast(field + ' is empty!', 3000, 'danger');
      return false
    }

    return true
  }

  validateEqualPasswords(password: string, passwordTwo: string){
    const value: boolean = password == passwordTwo;
    if(!value){
      this.toastService.presentToast('Passwords are not equal.', 3000, 'danger');
    } 
    return value;
  }


}
