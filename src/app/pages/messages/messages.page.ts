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
  page: number = 1;
  fullyLoaded = false;

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
    });

    this.chatGroupService.getLastMessage().subscribe((resp) => {
      this.departmentService.getDepartment(this.user.department_id).subscribe((department) => {
        this.departmentMessage.departmentName = department.data.name;
        if (!resp) {
          this.departmentMessage.message = 'No messages in your group.';
        } else {
          console.log(resp)
          this.userService.getUserById(resp.data.sender_id).subscribe((user) => {
            console.log(user)
            this.departmentMessage.message = `${user.data.name} ${user.data.surname}: ${resp.data.message_body}`,
            this.departmentMessage.time = this.formatTime(new Date(resp.data.time))
            this.departmentMessage.sender = `${user.name} ${user.surname}`
          });
        }
      });
    });

    this.messageService.onInsertObservable().subscribe((message: Message) => {
      this.chats.forEach((chat: Chat, index) => {
        if (chat.user.id === message.receiver) {
          message.was_seen = true;
          const topchat = this.chats.splice(index, 1)[0];
          topchat.messages[0] = message;
          this.chats.unshift(topchat);
        }
      });
    });
  }

  //TODO: IS THIS WORKING?
  loadData(event): void {
    if (!this.fullyLoaded) {
      this.page += 1;
      setTimeout(() => {
        const res = this.addMoreItems();
        if (!res) {
          this.fullyLoaded = true;
        }
        event.target.complete();
      }, 2000);
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

  addMoreItems(): boolean {
    return false;
  }
  goToProfile(id: number): void {
    this.router.navigateByUrl('/profile/' + id);
  }

  redirectToChat(id: number, chat: Chat): void {
    if (!chat.messages[0].was_seen) {
      this.messageService
        .setAsSeen(this.currentUser.id, chat.user.id)
        .subscribe(() => (chat.messages[0].was_seen = true));
    }
    this.router.navigateByUrl('/message/' + id);
  }
  
  redirectToGroup(id: number): void {
    this.router.navigateByUrl('/chat-group/' + id);
  }
}
