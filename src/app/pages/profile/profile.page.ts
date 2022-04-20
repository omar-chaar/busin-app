import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, UserService } from 'src/app/services/user/user.service';
import { Location } from '@angular/common'
import { DepartamentService, IDepartament } from 'src/app/services/departament/departament.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileUser: IUser;
  departament: IDepartament;

  constructor(private route: ActivatedRoute, private _router: Router, private userService: UserService,
     private location: Location, private departamentService: DepartamentService) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    const profileUser = this.userService.getUser(id);
    if(typeof profileUser === 'boolean'){
      this._router.navigateByUrl('/tabs/messages')
    }else{
      this.profileUser = profileUser;
      this.departament = this.departamentService.getDepartament(profileUser.departament)
    }
  }

  redirectTo(url:string): void {
    //this.location.back()
    this._router.navigateByUrl(url)
  }

}
