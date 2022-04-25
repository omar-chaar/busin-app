import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/model/classes/User';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  user: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.currentUser;
  }

  ngOnInit(): void {
    // if(!this.user){
    //   this.router.navigateByUrl('/user-login')
    // }
  }

  redirectTo(url: string){
    this.router.navigateByUrl(url)
  }

  logout(){
    if(this.userService.logout()){
      this.router.navigateByUrl('/login')
    }
  }

}
