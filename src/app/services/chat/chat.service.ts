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
  subject = new Subject();

  constructor(private userService: UserService, private messageService: MessagesService,
    private http: HttpClient) {

  }

  getChats(user: User): void {
    const headers = { 'authorization': 'Bearer ' + user.token };
    this.http.get<any>(environment.apiUrl + '/messages/get-messages/' + user.id, {headers: headers}).subscribe(
      (data) => {
        this.chats = data.messages.map((data) => {
          const user = {name: data.user.name, surname: data.user.surname, picture: data.user.profilePicture, id: data.user.id};
          const message = new Message(data.chatMessageId, data.chatSenderId, data.chatReceiverId, data.chatTime, data.chatMessage, 
            data.chatWasSeen, data.parentMessageId);
          const messages: Message[] = [message];
          return new Chat(data.chatId, messages, null, user);
        })
        this.subject.next(this.chats);
      },
      (error) => {
        console.log(error);
      }
      );
  }

  onLoad(): Observable<any> {
    return this.subject.asObservable();
  }

}
