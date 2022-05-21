import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable, Subject } from 'rxjs';

import { User } from 'src/model/classes/User';
import { Chat } from 'src/model/classes/Chat';
import { Message } from 'src/model/classes/Message';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private subject = new Subject();

  constructor(private userService: UserService, private http: HttpClient) {
   
  }

}
