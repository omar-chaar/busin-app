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

  fakeDb: ChatMessage[];

  constructor(private userService: UserService, private chatGroupService: ChatGroupService) {
    this.fakeDb = [
      new ChatMessage(0, this.userService.getUser(0), this.chatGroupService.getChatById(0), new Date(), 'IT message 1'),
      new ChatMessage(1, this.userService.getUser(1), this.chatGroupService.getChatById(0), new Date(), 'IT message 2'),
      new ChatMessage(2, this.userService.getUser(2), this.chatGroupService.getChatById(0), new Date(), 'IT message 3'),
      new ChatMessage(3, this.userService.getUser(6), this.chatGroupService.getChatById(3), new Date(), 'Sales message'),
      new ChatMessage(4, this.userService.getUser(4), this.chatGroupService.getChatById(2), new Date(), 'Accounting message'),
      new ChatMessage(5, this.userService.getUser(8), this.chatGroupService.getChatById(4), new Date(), 'Logistics message'),
    ];
   }

   getMessagesByGroup(group: ChatGroup): ChatMessage[]{
     return this.fakeDb.filter(message => message.group === group);
   }

   insertMessage(message:string, sender: User, chat: ChatGroup):ChatMessage{
    const newMsg = new ChatMessage(this.fakeDb.length, sender, chat, new Date(), message)
    this.fakeDb.push(newMsg)
    return newMsg
   }

   async deleteMessagesByUser(user: User): Promise<boolean> {
    this.fakeDb.forEach((message: ChatMessage, index: number, arr: ChatMessage[]) => {
      if (message.sender === user) {
        arr.splice(index, 1)
      }
    })
    return true;
  }
}
