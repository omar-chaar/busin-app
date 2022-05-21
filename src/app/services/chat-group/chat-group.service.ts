import { Injectable } from '@angular/core';
import { ChatMessage} from 'src/model/classes/ChatMessage';
import { ChatGroup } from 'src/model/classes/ChatGroup';
import { DepartmentService } from '../department/department.service';
import { UserService } from '../user/user.service';
import { ChatMessageService } from '../chat-message/chat-message.service';
import { Department } from 'src/model/classes/Department';
import { User } from 'src/model/classes/User';

@Injectable({
  providedIn: 'root'
})
export class ChatGroupService {


  constructor(private departmentService: DepartmentService, private userService: UserService) { 
  }

}
