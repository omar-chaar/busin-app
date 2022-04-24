import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/model/classes/User';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  user: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.currentUser;
  }

  redirectTo(url: string){
    this.router.navigateByUrl(url)
  }

}
