import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat/chat.service';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';
import { MessagesService } from 'src/app/services/messages/messages.service';

import { User } from 'src/model/classes/User';
import { Chat } from 'src/model/classes/Chat';
import { Message } from 'src/model/classes/Message';
import { ChatGroupService } from 'src/app/services/chat-group/chat-group.service';
import { Department } from 'src/model/classes/Department';
import { DepartmentService } from 'src/app/services/department/department.service';

@Component({
  selector: 'app-messages',
  templateUrl: 'messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  //users: {name: string, unread: number}[]  = []
  chats: Chat[] = [];
  users: User[] = [];
  departmentMessage: any = {};
  currentUser: User;
  fullyLoaded = false;
  page: number = 1;

  //user for test
  user: User = this.userService.currentUser;

  constructor(
    private router: Router,
    private chatService: ChatService,
    private userService: UserService,
    private messageService: MessagesService,
    private chatGroupService: ChatGroupService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.chatService.onLoad().subscribe((chats: Chat[]) => {
      this.currentUser = this.userService.currentUser;
      this.chats = chats;
      this.chats.forEach((chat: Chat) => {
        if (!(chat.message.message.substring(0, 5) === 'You: ')) {
          this.concantYou(chat);
        }
      });
    });
    this.loadFirstMessageGroup();
    this.messageService.onInsertObservable().subscribe((message: Message) => {
      this.chats.forEach((chat: Chat, index) => {
        if (chat.user.id === message.receiver) {
          message.was_seen = true;
          const topchat = this.chats.splice(index, 1)[0];
          topchat.message = message;
          this.chats.unshift(topchat);
        }
      });
    });
  }

  loadFirstMessageGroup() {
    this.chatGroupService.getLastMessage().subscribe((resp) => {
      this.departmentService.getDepartment(this.user.department_id).subscribe((department) => {
        this.departmentMessage.departmentName = department.data.name;
        if (!resp) {
          this.departmentMessage.message = 'No messages in your group.';
        } else {
          this.userService.getUserById(resp.data.sender_id).subscribe((user) => {
            this.departmentMessage.message = `${user.data.name} ${user.data.surname}: ${resp.data.message_body}`,
              this.departmentMessage.time = this.formatTime(new Date(resp.data.time))
            this.departmentMessage.sender = `${user.name} ${user.surname}`
          });
        }
      });
    });
  }

  loadData(event): void {
    this.fullyLoaded = this.chatService.fullyLoaded;
    if (!this.fullyLoaded) {
      setTimeout(() => {
        this.addMoreItems();
        event.target.complete();
      }, 2000);
    } else {
      event.target.disabled = true;
    }
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

  //convert javascript date to local timezone date


  addMoreItems() {
    this.chatService.getNextTenChats(this.page);
    this.page++;
  }

  concantYou(chat: Chat): string {
    if (chat.message.sender === this.user.id) {
      return chat.message.message = `You: ${chat.message.message}`;
    }
  }

  goToProfile(id: number): void {
    this.router.navigateByUrl('/profile/' + id);
  }

  redirectToChat(id: number, chat: Chat): void {
    chat.unreads = 0;
    this.messageService
      .setAsSeen(this.currentUser.id, chat.user.id)
      .subscribe(() => (chat.message.was_seen = true));
    this.router.navigateByUrl('/message/' + id);
  }

  redirectToGroup(id: number): void {
    this.router.navigateByUrl('/chat-group/' + id);
  }

  doRefresh(event) {
    setTimeout(() => {
      this.chats = [];
      this.users = [];
      this.departmentMessage = {};
      this.fullyLoaded = false;
      this.page = 1;
      this.chatService.getChats(this.userService.currentUser);
      this.user = this.userService.currentUser;
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

}
