import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat/chat.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { UserService } from 'src/app/services/user/user.service';
import { IonInfiniteScroll} from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { Message } from 'src/model/classes/Message';
import { User } from 'src/model/classes/User';
import { Chat } from 'src/model/classes/Chat';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  contact: any = new User(0, '', '', '', '', null, 0, false, false);
  messages: Message[] = [];
  user: User;
  text: string;
  fullyLoaded = false;

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
      this.messagesService
        .getMessages(this.user.id, this.contact.user_id)
        .subscribe((data) => {
          this.messages = data.messages.map(
            (message) =>
              new Message(
                message.message_id,
                message.sender_id,
                message.receiver_id,
                message.time,
                message.message_body,
                message.was_seen,
                message.parent_message_id
              )
          );
          setTimeout(() => {
            this.ScrollToBottom();
          });
        });
    });
  }

  goBack(): void {
    this._router.navigateByUrl('/tabs/messages');
  }

  goToProfile(id: number): void {
    this._router.navigateByUrl('/profile/' + id);
  }

  onSubmit(): void {
    if (this.text) {
      let parentMessageId =
        this.messages.length != 0
          ? this.messages[this.messages.length - 1].id
          : null;
      this.messagesService
        .sendMessage(
          this.user.id,
          this.contact.user_id,
          this.text,
          parentMessageId
        )
        .subscribe((data) => {
          const newmessage = new Message(
            data.response,
            this.user.id,
            this.contact.user_id,
            new Date(),
            this.text,
            false,
            parentMessageId
          );
          this.messages.push(newmessage);
          this.messagesService.onInsert(newmessage);
          this.text = '';

          setTimeout(() => {
            this.ScrollToBottomWithAnim();
          });
        });
    }
  }

  orderByDate(messages: Message[]): Message[] {
    return messages.sort((a, b) => {
      return +a.time - +b.time;
    });
  }

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

  loadMoreMessages(): void {
    const id = this.messages[0].id;
    this.messagesService
      .updateMessages(this.user.id, this.contact.user_id, id)
      .subscribe((data) => {
        const newmessages = data.messages.map(
          (message) =>
            new Message(
              message.message_id,
              message.sender_id,
              message.receiver_id,
              message.time,
              message.message_body,
              message.was_seen,
              message.parent_message_id
            )
        );
        if (newmessages.length == 0) {
          return (this.fullyLoaded = true);
        }
        this.messages = [...this.messages, ...newmessages];
        this.orderByDate(this.messages);
      });
  }

  loadData(event) {
    if (!this.fullyLoaded) {
      console.log('Loading');
      setTimeout(() => {
        this.loadMoreMessages();
        event.target.complete();
        console.log('Done');
      }, 500);
    } else {
      event.target.disabled = true;
    }
  }

  ScrollToBottom() {
    this.content.scrollToBottom(0);
  }

  ScrollToBottomWithAnim() {
    this.content.scrollToBottom(500);
  }
}
