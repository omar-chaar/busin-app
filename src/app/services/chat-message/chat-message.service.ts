import { Injectable } from '@angular/core';
import { ChatGroup } from 'src/model/classes/ChatGroup';
import { ChatMessage } from 'src/model/classes/ChatMessage';
import { User } from 'src/model/classes/User';
import { ChatGroupService } from '../chat-group/chat-group.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatMessageService {

  constructor(private userService: UserService, private chatGroupService: ChatGroupService) {
   }

}
