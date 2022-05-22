import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat/chat.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { UserService } from 'src/app/services/user/user.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { Message } from 'src/model/classes/Message';
import { User } from 'src/model/classes/User';
import { Chat } from 'src/model/classes/Chat';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  contact: User;
  messages: Message[] = [];
  user: User;
  text: string;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService,
    private messagesService: MessagesService
  ) {
    this.user = this.userService.currentUser;
  }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.userService.getUserById(id).subscribe((user) => {
      this.contact = user.data;
    });
  }

  goBack(): void {
    this._router.navigateByUrl('/tabs/messages');
  }

  goToProfile(id: number): void {
    this._router.navigateByUrl('/profile/' + id);
  }

  onSubmit(): void {}

  formatTime(date: Date): string {
    const hour: string =
      date.getHours().toString().length === 1
        ? `0${date.getHours().toString()}`
        : date.getHours().toString();
    const minutes: string =
      date.getMinutes().toString().length === 1
        ? `0${date.getMinutes().toString()}`
        : date.getMinutes().toString();
    return `${hour}:${minutes}`;
  }

  startCall(id: number): void {
    this._router.navigateByUrl('/voice-call/' + id);
  }

  loadMessages(event) {
    setTimeout(() => {
      this.messages = this.messages.concat(this.chat.messages);
      event.target.complete();
      if (this.messages.length === 0) {
        this.toggleInfiniteScroll();
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
