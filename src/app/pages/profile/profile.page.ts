import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Location } from '@angular/common'
import { DepartmentService } from 'src/app/services/department/department.service';

import { User } from 'src/model/classes/User';
import { Department } from 'src/model/classes/Department';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileUser: User;
  department: Department;
  user: User;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute, private _router: Router, private userService: UserService,
    private chatService: ChatService, private departmentService: DepartmentService) {
    const id = +this.route.snapshot.params['id'];    
  }

  ngOnInit() {
    this.profileUser = this.userService.currentUser;
    this.department = this.departmentService.currentUserDepartment;
  }

  redirectTo(url: string): void {
    //this.location.back()
    this._router.navigateByUrl(url)
  }

  redirectToChat(contact: User) {
    this._router.navigateByUrl('/message/' + '')
  }

  switchEdit() {
    this.editMode = !this.editMode;
  }
  
}
