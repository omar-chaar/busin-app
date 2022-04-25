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

@Component({
  selector: 'app-messages',
  templateUrl: 'messages.page.html',
  styleUrls: ['./messages.page.scss']
})
export class MessagesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  //users: {name: string, unread: number}[]  = []
  chats: Chat[] = []
  page: number = 1;
  fullyLoaded = false
  subscription: Subscription;
  subscriptionB: Subscription;

  //user for test
  user: User = this.userService.currentUser

  constructor(private router: Router, private chatService: ChatService, private userService: UserService,
    private messageService: MessagesService) {

    this.subscription = messageService.onChange().subscribe(value => {
      const chat = this.chatService.getChatByMessage(value)
      if (!this.chats.includes(chat)) {
        this.chats.unshift(chat)
      } else {
        this.sortChatsByDate(this.chats)
      }

    })
    this.subscriptionB = this.chatService.onDelete().subscribe(value => {
      const index = this.chats.indexOf(value);
      if(index){
        this.chats.splice(index, 1);
      }
    })
  }

  ngOnInit(): void {
    const chats = this.chatService.getChats(this.user, this.page)
    this.sortChatsByDate(chats)
  }

  loadData(event): void {
    if (!this.fullyLoaded) {
      this.page += 1;
      setTimeout(() => {
        const res = this.addMoreItems();
        if (!res) {
          this.fullyLoaded = true
        }
        event.target.complete();
      }, 2000);
    }
  }

  addMoreItems(): boolean {
    const chats = this.chatService.getChats(this.user, this.page)
    if (chats.length === 0) return false
    this.chats.push(...chats)
    return true
  }

  redirectToMessage(chatId: number) {
    this.router.navigateByUrl('/message/' + chatId);
  }

  sortChatsByDate(chats: Chat[]): void {
    const sortedArr = chats.sort(function (a, b) {
      const msgA = a.messages[a.messages.length - 1]
      const msgB = b.messages[b.messages.length - 1]
      return msgB.time.getTime() - msgA.time.getTime();
    });
    this.chats = sortedArr
  }

  formatTime(date: Date): string {
    const hour: string = date.getHours().toString().length === 1 ? `0${date.getHours().toString()}` : date.getHours().toString();
    const minutes: string = date.getMinutes().toString().length === 1 ? `0${date.getMinutes().toString()}` : date.getMinutes().toString();
    return `${hour}:${minutes}`
  }

  goToProfile(id: number): void {
    this.router.navigateByUrl('/profile/' + id)
  }

  
  
}
