import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatGroupService } from 'src/app/services/chat-group/chat-group.service';
import { ChatMessageService } from 'src/app/services/chat-message/chat-message.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import { UserService } from 'src/app/services/user/user.service';
import { ChatGroup } from 'src/model/classes/ChatGroup';
import { ChatMessage } from 'src/model/classes/ChatMessage';
import { Department } from 'src/model/classes/Department';
import { User } from 'src/model/classes/User';

@Component({
  selector: 'app-chat-group',
  templateUrl: './chat-group.page.html',
  styleUrls: ['./chat-group.page.scss'],
})
export class ChatGroupPage implements OnInit {

  department: Department = new Department(-1, '', -1);
  messages: ChatMessage[] = [];
  user: User;
  text: string;

  constructor(private _router: Router, private route: ActivatedRoute,
   private userService: UserService, private departmentService: DepartmentService) { }

  ngOnInit() {
     const id = +this.route.snapshot.params['id'];
    this.user = this.userService.currentUser;
    this.departmentService.getDepartment(id).subscribe((department) => {
      this.department = new Department(department.data.department_id, department.data.name, department.data.company_id);      
    }); 
  }

  goBack(): void {
    this._router.navigateByUrl('/tabs/contacts')
  }

  onSubmit(): void {

  }


}
