import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  
  constructor(public toastController: ToastController) { 
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
 
}
