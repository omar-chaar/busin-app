import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Location } from '@angular/common';

import { User } from 'src/model/classes/User';
import { department } from 'src/model/classes/department';



@Component({
  selector: 'app-voice-call',
  templateUrl: './voice-call.page.html',
  styleUrls: ['./voice-call.page.scss'],
})
export class VoiceCallPage implements OnInit {

  profileUser: User;
  department: department;

  constructor(private route: ActivatedRoute, private _router: Router, private userService: UserService,
     private location: Location) { 
      
     }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    const profileUser = this.userService.getUser(id);
    if(typeof profileUser === 'boolean'){
      this._router.navigateByUrl('/tabs/messages')
    }else{
      this.profileUser = profileUser;
      this.department = profileUser.department;
    }
  }

  goBack(): void {
    this.location.back()
  }
  

}
