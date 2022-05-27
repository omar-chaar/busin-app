import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';
import { Message } from 'src/model/classes/Message';
import { User } from 'src/model/classes/User';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket = io(environment.apiUrl);
  
  constructor(private userService: UserService) { }

  sendMessage(message: Message, token: string = this.userService.currentUser.token) {
    this.socket.emit('message', message);
  }
}
