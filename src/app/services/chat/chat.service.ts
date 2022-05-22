import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { MessagesService } from '../messages/messages.service';
import { UserService } from '../user/user.service';

import { User } from 'src/model/classes/User';
import { Chat } from 'src/model/classes/Chat';
import { Message } from 'src/model/classes/Message';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


type ChatData = {
  messages: {
    id: any[];
  }
}

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
    this.http.get<any>(environment.apiUrl + '/messages/get-messages/' + user.id).subscribe(
      (data: ChatData) => {
        this.chats = Object.entries(data.messages).map(
          ([key, value]) => {
            const messages = value.map(
              (message: any) => {
                const user = new User(message.user_id, message.name, message.surname, message.position, message.email, message.profilePicture,
                  message.department_id, message.is_adm, message.is_owner);

                  console.log(user)

                return new Message(message.message_id, user, message.receiver_id, message.time, message.message_body,
                  message.was_seen, message.parent_message_id);
              }
            )
            return new Chat(parseInt(key), messages);
          }
        )
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
