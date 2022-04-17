import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
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


}
