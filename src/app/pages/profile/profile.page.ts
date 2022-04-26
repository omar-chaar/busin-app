import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Location } from '@angular/common'
import { departmentService } from 'src/app/services/department/department.service';

import { User } from 'src/model/classes/User';
import { department } from 'src/model/classes/department';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileUser: User;
  department: department;
  user: User;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute, private _router: Router, private userService: UserService,
    private chatService: ChatService, private departmentService: departmentService) {
    const id = +this.route.snapshot.params['id'];
    const profileUser = this.userService.getUser(id);
    if (typeof profileUser === 'boolean') {
      this._router.navigateByUrl('/tabs/messages')
    } else {
      this.profileUser = profileUser;
      this.department = profileUser.department
      this.user = this.userService.currentUser;
    }
  }

  ngOnInit() {

  }

  redirectTo(url: string): void {
    //this.location.back()
    this._router.navigateByUrl(url)
  }

  redirectToChat(contact: User) {
    const chatId = this.chatService.verifyChat(contact, this.user)
    this._router.navigateByUrl('/message/' + chatId)
  }

  switchEdit() {
    this.editMode = !this.editMode;
  }
  
}
