import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';
import { User } from 'src/model/classes/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private userService: UserService, private router: Router) {
    if (localStorage.getItem('token')) {
      userService.getUserByToken(localStorage.getItem('token')).subscribe(
        (resp) => {
          this.userService.currentUser = new User(resp.data.user_id, resp.data.name, resp.data.surname,
            resp.data.position, resp.data.email, resp.data.profilePicture, resp.data.department_id,
            resp.data.is_adm, resp.data.is_owner, resp.token);
          router.navigateByUrl('/tabs/announcements');
        })
    }
  }
}
