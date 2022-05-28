import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat/chat.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { UserService } from 'src/app/services/user/user.service';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { Message } from 'src/model/classes/Message';
import { User } from 'src/model/classes/User';
import { Chat } from 'src/model/classes/Chat';
import { Observable, Subject } from 'rxjs';
import { SocketioService } from 'src/app/services/socketio/socketio.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  contact: any = new User(0, '', '', '', '', null, 0, false, false);
  messages: Message[] = [];
  messageToSend: Message;
  user: User;
  text: string;
  fullyLoaded = true;
  page:number = 1;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService,
    private messagesService: MessagesService,
    private socketService: SocketioService,
    private location: Location,
    private navController: NavController
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
          if(this.messages.length >= 10) {
            this.fullyLoaded = false;
          }
          setTimeout(() => {
            this.ScrollToBottom();
          });          
          this.socketService.connect();
          this.socketService.getNewMessage().subscribe((message: Message) => {
            if (message != null)
              if (message.sender != this.user.id) {          
                var messageToPush = new Message(message.id, message.sender, message.receiver, message.time, message.message, message.was_seen, message.parentMessage);
                if(!this.messages.some(message => message.id == messageToPush.id)){
                  this.messages.push(messageToPush);
                }
                setTimeout(() => {
                  this.ScrollToBottom();
                }, 20);
              }     
          });
        });        
    });
   }
  

  ngOnDestroy() {
    this.socketService.disconnect();
    this.messages = [];
  }

  
  goBack(): void {
    this.navController.setDirection("back", true, "back");
    this.location.back();
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
      this.messageToSend = new Message(
        -1,
        this.user.id,
        this.contact.user_id,
        new Date(),
        this.text,
        false,
        parentMessageId
      );
      this.messages.push(this.messageToSend);
      this.messagesService
        .sendMessage(
          this.user.id,
          this.contact.user_id,
          this.text,
          parentMessageId
        )
        .subscribe((data) => {
          this.messageToSend.id = data.response;
          this.messages[this.messages.length - 1] = this.messageToSend;
          this.messagesService.onInsert(this.messageToSend);
          this.socketService.sendMessage(this.messageToSend);
          this.text = '';
          setTimeout(() => {
            this.ScrollToBottomWithAnim();
          });
        });
    }
  }

  // Loading functions

  loadData(event) {
    if (!this.fullyLoaded) {
      setTimeout(() => {
        this.loadMoreMessages();
        event.target.complete();
      }, 500);
    } else {
      event.target.disabled = true;
    }
  }

  loadMoreMessages(): void {
    const id = this.messages[this.messages.length - 1].id;
    this.messagesService
      .updateMessages(this.user.id, this.contact.user_id, id, this.page)
      .subscribe((data) => {
        this.page += 1;
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
        this.messages = [...newmessages, ...this.messages];
      });
  }

  //Format functions

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

  //Animation functions

  ScrollToBottom() {
    this.content.scrollToBottom(0);
  }

  ScrollToBottomWithAnim() {
    this.content.scrollToBottom(500);
  }
}
