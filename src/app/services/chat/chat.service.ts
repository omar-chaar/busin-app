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


  constructor(private userService: UserService, private messageService: MessagesService, 
    http: HttpClient) {

   
  }



}
