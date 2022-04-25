import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat/chat.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { UserService } from 'src/app/services/user/user.service';

import { User } from 'src/model/classes/User';
import { Chat } from 'src/model/classes/Chat';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  contact: User;
  chat: Chat;
  user: User;
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
      chat.unreads = 0;
      this.chat = chat;
      this.contact = chat.participants.filter(participant => participant.id !== this.user.id)[0];
    }
  }

  goBack(): void {
    this._router.navigateByUrl('/tabs/messages')
  }

  goToProfile(id: number):void{
    this._router.navigateByUrl('/profile/' + id)
  }

  onSubmit(): void {
    if (this.text.length > 0) {
      const msg = this.messagesService.insertMessage(this.text, this.user, this.contact, this.chat)
      this.text = ''
    }
  }

  formatTime(date: Date):string{
    const hour:string = date.getHours().toString().length === 1 ? `0${date.getHours().toString()}` : date.getHours().toString();
    const minutes:string = date.getMinutes().toString().length === 1 ? `0${date.getMinutes().toString()}` : date.getMinutes().toString();
    return `${hour}:${minutes}`
  }

  startCall(id: number): void {
    this._router.navigateByUrl('/voice-call/' + id)
  }

}
