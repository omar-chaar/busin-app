import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {

  email: string
  password: string

  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }

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

  handleSubmit():void {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

    if(!this.email || !this.email.match(emailRegex)){
      this.presentToast('Invalid e-mail format.', 4000, 'danger')
      return
    }
    if(!this.password || this.password.length < 6){
      this.presentToast('Your password is too short!', 4000, 'danger')
      return
    }

    this.presentToast('Logged!', 4000, 'success')
  }
}
