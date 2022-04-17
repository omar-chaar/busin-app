import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  emailRegex: RegExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

  constructor(public toastController: ToastController) { }

  async presentToast(message: string, duration: number, color: string) {
    const toast = await this.toastController.create({
      message,
      duration,
      icon: 'information-circle',
      position: 'top',
      color
    });
    toast.present();
  }

  validateEmail(email: string): boolean {
    if (!email) {
      this.presentToast('E-mail field is empty!', 3000, 'danger')
      return true
    }
    if (email.match(this.emailRegex))
      return false
    this.presentToast('Invalid e-mail format!', 3000, 'danger')
    return true

  }

  validatePassword(password: string): boolean {
    if(!password){
      this.presentToast('Password field is empty', 3000, 'danger')
      return true
    }
    if (password.length >= 6)
      return false
    this.presentToast('Password is too short!', 3000, 'danger')
    return true

  }


}
