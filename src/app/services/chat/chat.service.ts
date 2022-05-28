import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { MessagesService } from '../messages/messages.service';
import { UserService } from '../user/user.service';

import { User } from 'src/model/classes/User';
import { Chat } from 'src/model/classes/Chat';
import { Message } from 'src/model/classes/Message';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ChatService {


  chats: Chat[];
  user: User;
  subject = new Subject();
  fullyLoaded = false;

  constructor(private userService: UserService, private messageService: MessagesService,
    private http: HttpClient) {

  }

  getChats(user: User): void {
    this.user = user;
    const headers = { 'authorization': 'Bearer ' + user.token };
    this.http.post<any>(environment.apiUrl + '/messages/get-messages/' + user.id,{ page: 0 },{headers: headers}).subscribe(
      (data) => {
        this.chats = data.messages.map((data) => {
          const user = {name: data.user.name, surname: data.user.surname, picture: data.user.profilePicture, id: data.user.id};
          const message = new Message(data.chatMessageId, data.chatSenderId, data.chatReceiverId, data.chatTime, data.chatMessage, 
            data.chatWasSeen, data.parentMessageId);
          return new Chat(data.chatId, message, null, user);
        })
        if(this.chats.length < 10) {
          this.fullyLoaded = true;
        }
        this.chats.forEach(chat => {
          this.getUnreads(chat.user.id).subscribe(data => {
            chat.unreads = data.unread;
          })
        })
        this.subject.next(this.chats);
      },
      (error) => {
        console.log(error);

      }
      );
  }

  getNextTenChats(page: number): void {
    const headers = { 'authorization': 'Bearer ' + this.user.token };
    const body = { page: page };
    this.http.post<any>(environment.apiUrl + '/messages/get-messages/' + this.user.id, body, { headers: headers }).subscribe(
      (data) => {
        var newChats = data.messages.map((data) => {
          const user = {name: data.user.name, surname: data.user.surname, picture: data.user.profilePicture, id: data.user.id};
          const message = new Message(data.chatMessageId, data.chatSenderId, data.chatReceiverId, data.chatTime, data.chatMessage, 
            data.chatWasSeen, data.parentMessageId);
          return new Chat(data.chatId, message, null, user);
        })
        if(newChats.length < 10) {
          this.fullyLoaded = true;
        }
        newChats.forEach((chat: Chat) => {
          this.getUnreads(chat.user.id).subscribe(data => {
            chat.unreads = data.unread;
          })
        })
        this.chats = this.chats.concat(newChats);
        this.subject.next(this.chats);
      },
      (error) => {
        console.log(error);

      }
      );
    }

  getUnreads(senderId: number):Observable<any>{
    const headers = { 'authorization': 'Bearer ' + this.user.token };
    const body = {receiverId: this.userService.currentUser.id, senderId};
    return this.http.post<any>(environment.apiUrl + '/messages/get-unread', body,{headers: headers})
  }

  onLoad(): Observable<any> {
    return this.subject.asObservable();
  }
  onDelete(): Observable<any> {
    return this.subject.asObservable()

  }

}
