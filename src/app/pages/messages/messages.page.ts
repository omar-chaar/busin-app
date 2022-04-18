import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { ChatService, IChat } from 'src/app/services/chat/chat.service';
import { IUser, UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: 'messages.page.html',
  styleUrls: ['./messages.page.scss']
})
export class MessagesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  //users: {name: string, unread: number}[]  = []
  chats: IChat[] = []
  page:number = 1;
  fullyLoaded = false
  
  //user for test
  user: IUser = this.userService.currentUser

  constructor(private router: Router, private chatService: ChatService, private userService: UserService) {
    
  }

  ngOnInit(): void {
    const chats = this.chatService.getChats(this.user, this.page)
    this.chats.push(...chats)
  }

  loadData(event): void {
    this.page += 1;
    setTimeout(() => {
      const res = this.addMoreItems();
      if(!res){
        this.fullyLoaded = true
      }
      event.target.complete();
    }, 2000);
  }

  addMoreItems():boolean{
    const chats = this.chatService.getChats(this.user, this.page)
    if(chats.length === 0) return false
    this.chats.push(...chats)
    return true
  }

  redirectToMessage(chatId: number){
    this.router.navigateByUrl('/message/' + chatId);
  }

  formatTime(date: Date):string{
    const hour:string = date.getHours().toString().length === 1 ? `0${date.getHours().toString()}` : date.getHours().toString();
    const minutes:string = date.getMinutes().toString().length === 1 ? `0${date.getMinutes().toString()}` : date.getMinutes().toString();
    return `${hour}:${minutes}`
  }
}
