import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { MessagesService } from '../messages/messages.service';
import { UserService } from '../user/user.service';

import { User } from 'src/model/classes/User';
import { Chat } from 'src/model/classes/Chat';
import { Message } from 'src/model/classes/Message';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatsPerRequest: number = 10;
  subscription: Subscription;
  private subject = new Subject();
  fakeDb: Chat[];

  constructor(private userService: UserService, private messageService: MessagesService) {

    this.fakeDb = [
      new Chat(0, [this.userService.getUser(0), this.userService.getUser(1)]),
      new Chat(1, [this.userService.getUser(5), this.userService.getUser(3)]),
      new Chat(2, [this.userService.getUser(2), this.userService.getUser(5)]),
      new Chat(3, [this.userService.getUser(5), this.userService.getUser(4)]),
      new Chat(4, [this.userService.getUser(5), this.userService.getUser(1)]),
      new Chat(5, [this.userService.getUser(6), this.userService.getUser(5)]),
    ]
    this.updateMessages()
    this.subscription = messageService.onChange().subscribe(value => {
      this.fakeDb.forEach(chat => {
        if(chat.id === value.chatId)
          chat.insertMessage(value)
        return chat
      })
    })
  }

  

  getChats(user:User, page:number) {
    const chats = this.fakeDb.filter((chat: Chat, index: number) => user.id === chat.participants[0].id || user.id === chat.participants[1].id)
    return chats.slice((page - 1) * this.chatsPerRequest, page * this.chatsPerRequest);
  }

  getChat(id: number, user: User):Chat|boolean{
    const chat = this.fakeDb.filter((chat: Chat) => chat.id === id)[0]
    if(chat.participants.includes(user)) return chat
    else return false
  }

  getChatByMessage(message: Message):Chat{
    return this.fakeDb.filter(chat => chat.messages.includes(message))[0]
  }

  updateMessages():void{
    this.fakeDb.forEach((chat: Chat) => {
      const messages: Message[] = this.messageService.getMessages(chat.participants, chat)
      const unreads = messages.reduce((previous, current):number => {
        if(current.read) return previous
        else return previous+1
      }, 0)

      chat.unreads = unreads
      if(messages.length > 0)
        chat.loadMoreMessages(messages)
    })
  }

  newChat(userA: User, userB:User):Chat{
    return new Chat(this.fakeDb.length, [userA, userB])
  }

  verifyChat(userA: User, userB: User):number{
    let chat: Chat;
    const exists = this.fakeDb.reduce((previous, current) => {
      if(previous) return true
      if(current.participants.includes(userA) && current.participants.includes(userB)){
        chat = current
        return true
      }
      return false
    }, false)

    if(exists){
      return chat.id
    }else{
      const newChat = this.newChat(userA, userB)
      this.fakeDb.push(newChat)
      return newChat.id
    }
    
  }

  async deleteChat(user: User):Promise<boolean>{
    let deletedChat: Chat;
    this.fakeDb.forEach((chat: Chat, index: number, arr: Chat[]) => {
      if(chat.participants.includes(user)){
        deletedChat = chat; 
        arr.splice(index, 1);
      }
    })
    this.subject.next(deletedChat)
    return true
  }

  onDelete(): Observable<any> {
    return this.subject.asObservable()
  }

}
