import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/model/classes/User';
import { PopoverController } from '@ionic/angular';
// import { PopoverComponent } from '../../component/popover/popover.component';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  user: User;

  constructor(private userService: UserService, private router: Router, public popoverController: PopoverController) {
      this.user = this.userService.currentUser;
    }

  ngOnInit(): void {
  }

  redirectTo(url: string){
    this.router.navigateByUrl(url)
  }

  logout(){
    if(this.userService.logout()){
      this.router.navigateByUrl('/login')
    }
  }

  
  /* async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();
  
    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  } */
}
