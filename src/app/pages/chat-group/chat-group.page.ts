import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatGroupService } from 'src/app/services/chat-group/chat-group.service';
import { ChatMessageService } from 'src/app/services/chat-message/chat-message.service';
import { UserService } from 'src/app/services/user/user.service';
import { ChatGroup } from 'src/model/classes/ChatGroup';
import { ChatMessage } from 'src/model/classes/ChatMessage';
import { User } from 'src/model/classes/User';

@Component({
  selector: 'app-chat-group',
  templateUrl: './chat-group.page.html',
  styleUrls: ['./chat-group.page.scss'],
})
export class ChatGroupPage implements OnInit {

  chat: ChatGroup;
  messages: ChatMessage[];
  user: User;
  text: string;

  constructor(private _router: Router, private route: ActivatedRoute,
    private chatGroupService: ChatGroupService, private userService: UserService,
    private chatMessageService: ChatMessageService) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
    const id = +this.route.snapshot.params['id'];
    const chat = this.chatGroupService.getChatById(id);
    if(typeof chat === 'boolean'){
      this._router.navigateByUrl('/tabs/messages')
    }else{
      this.chat = chat;
      this.messages = this.chatMessageService.getMessagesByGroup(chat)
    }
  }

  formatTime(date: Date):string{
    const hour:string = date.getHours().toString().length === 1 ? `0${date.getHours().toString()}` : date.getHours().toString();
    const minutes:string = date.getMinutes().toString().length === 1 ? `0${date.getMinutes().toString()}` : date.getMinutes().toString();
    return `${hour}:${minutes}`
  }

  goBack(): void {
    this._router.navigateByUrl('/tabs/contacts')
  }

  onSubmit(): void {
    if (this.text.length > 0) {
      const msg = this.chatMessageService.insertMessage(this.text, this.user, this.chat)
      this.text = ''
      this.messages.push(msg)
    }
  }


}
