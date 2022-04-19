import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, UserService } from 'src/app/services/user/user.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileUser: IUser;

  constructor(private route: ActivatedRoute, private _router: Router, private userService: UserService,
     private location: Location) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    const profileUser = this.userService.getUser(id);
    if(typeof profileUser === 'boolean'){
      this._router.navigateByUrl('/tabs/messages')
    }else{
      this.profileUser = profileUser;
    }
  }

  goBack(): void {
    //this.location.back()
    this._router.navigateByUrl('/tabs/messages')
  }

}
