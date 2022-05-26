import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Location } from '@angular/common';

import { User } from 'src/model/classes/User';
import { Department } from 'src/model/classes/Department';



@Component({
  selector: 'app-voice-call',
  templateUrl: './voice-call.page.html',
  styleUrls: ['./voice-call.page.scss'],
})
export class VoiceCallPage implements OnInit {

  profileUser: User;
  department: Department;

  constructor(private route: ActivatedRoute, private _router: Router, private userService: UserService,
     private location: Location) { 
      
     }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
  }

  goBack(): void {
    this.location.back()
  }
  

}
