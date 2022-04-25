import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Location } from '@angular/common'
import { DepartamentService } from 'src/app/services/departament/departament.service';

import { User } from 'src/model/classes/User';
import { Departament } from 'src/model/classes/Departament';


@Component({
  selector: 'app-voice-call',
  templateUrl: './voice-call.page.html',
  styleUrls: ['./voice-call.page.scss'],
})
export class VoiceCallPage implements OnInit {

  profileUser: User;
  departament: Departament;

  constructor(private route: ActivatedRoute, private _router: Router, private userService: UserService,
     private location: Location, private departamentService: DepartamentService) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    const profileUser = this.userService.getUser(id);
    if(typeof profileUser === 'boolean'){
      this._router.navigateByUrl('/tabs/messages')
    }else{
      this.profileUser = profileUser;
      this.departament = profileUser.departament;
    }
  }

  redirectTo(url:string): void {
    //this.location.back()
    this._router.navigateByUrl(url)
  }


}
