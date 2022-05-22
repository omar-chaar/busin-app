import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';
import { User } from 'src/model/classes/User';
import { Router } from '@angular/router';
import { CompanyService } from './services/company/company.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private userService: UserService, private companyService: CompanyService, private router: Router) {
    this.router.navigateByUrl('/login')
    if (localStorage && localStorage.getItem('token')) {
      userService.getUserByToken(localStorage.getItem('token')).subscribe(
        (resp) => {
          const user = new User(resp.data.user_id, resp.data.name, resp.data.surname,
            resp.data.position, resp.data.email, resp.data.profilePicture, resp.data.department_id,
            resp.data.is_adm, resp.data.is_owner, resp.token);
            this.userService.currentUser = user;
            this.userService.isLoaded(user);
            this.companyService.setCompany(user);
            router.navigateByUrl('/tabs/announcements');
            setTimeout(() => {
            }, 500)
        },
        (err) => {
          localStorage.removeItem('token');
          this.router.navigateByUrl('/login');
        }
      );
    }else{
      router.navigateByUrl('/login');
    }
  }
}
