import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';
import { Message } from 'src/model/classes/Message';
import { User } from 'src/model/classes/User';
import { UserService } from '../user/user.service';
import { ChatMessage } from 'src/model/classes/ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  
message$: BehaviorSubject<Message> = new BehaviorSubject(null);
groupMessage$: BehaviorSubject<ChatMessage> = new BehaviorSubject(null);

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

  //Group Messages
  groupConnection(group_id:number){
    this.socket.connect();
    this.socket.emit('group-connection', group_id);    
  }

  groupDisconnection(group_id:number){
    this.socket.emit('group-disconnect', "user left");
  }

  groupMessage(message: ChatMessage){
    this.socket.emit('group-message', message);
  }

  getNewMessageGroupMessage = () => {
    this.socket.on('group-message', (message: ChatMessage) =>{
      this.groupMessage$.next(message);
    });
    
    return this.groupMessage$.asObservable()
  }


}
