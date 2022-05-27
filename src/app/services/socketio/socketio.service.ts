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

  
message$: BehaviorSubject<Message> = new BehaviorSubject(null);
  socket = io(environment.apiUrl);
  
  
  constructor(private userService: UserService) { }

  connect() {
    this.socket.connect();
    this.sendToken(this.userService.currentUser.token);
  }
  
  sendToken(token:string) {
    this.socket.emit('token', token);
  }

  sendMessage(message:Message) {
    this.socket.emit('message', message);    
  }

  disconnect() {
    this.socket.disconnect();
  }
 getNewMessage = () => {
    this.socket.on('message', (message: Message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable()
  }
}
