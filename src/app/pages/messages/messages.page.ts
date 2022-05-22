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
  chats: Chat[] = [];
  users: User[] = [];
  currentUser: User;
  page: number = 1;
  fullyLoaded = false;

  //user for test
  user: User = this.userService.currentUser

  constructor(private router: Router, private chatService: ChatService, private userService: UserService,
    private messageService: MessagesService) {

    }

  ngOnInit(): void {
    this.chatService.onLoad().subscribe 
    (
      (chats: Chat[]) => {
        this.currentUser = this.userService.currentUser;
        this.chats = chats
      }
    )
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

  //format date to time
  formatDate(date: Date): string {
    const d = new Date(date)
    return d.toLocaleTimeString()
  }

  addMoreItems(): boolean {
    return false;
  }
  goToProfile(id: number): void {
    this.router.navigateByUrl('/profile/' + id)
  }

  
  
}
