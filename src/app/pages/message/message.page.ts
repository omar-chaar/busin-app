import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService, IChat } from 'src/app/services/chat/chat.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { IUser, UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  contact: IUser;
  chat: IChat;
  user: IUser;
  text: string;

  constructor(private _router: Router, private route: ActivatedRoute, private chatService: ChatService,
    private userService: UserService, private messagesService: MessagesService) {
    this.user = this.userService.currentUser
  }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    const chat = this.chatService.getChat(id, this.user);
    if(typeof chat === 'boolean'){
      this._router.navigateByUrl('/tabs/messages')
    }else{
      this.chat = chat;
      this.contact = chat.participants.filter(participant => participant.id !== this.user.id)[0];
    }
  }

  goBack(): void {
    this._router.navigateByUrl('/tabs/messages')
  }

  onSubmit(): void {
    if (this.text.length > 0) {
      const msg = this.messagesService.insertMessage(this.text, this.user, this.chat)
      this.text = ''
    }
  }

  formatTime(date: Date):string{
    const hour:string = date.getHours().toString().length === 1 ? `0${date.getHours().toString()}` : date.getHours().toString();
    const minutes:string = date.getMinutes().toString().length === 1 ? `0${date.getMinutes().toString()}` : date.getMinutes().toString();
    return `${hour}:${minutes}`
  }

}
