import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable, Subject } from 'rxjs';

import { User } from 'src/model/classes/User';
import { Chat } from 'src/model/classes/Chat';
import { Message } from 'src/model/classes/Message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private subject = new Subject();
  fakeDb: Message[];

  constructor(private userService: UserService) {
    this.fakeDb = [
      new Message(0, this.userService.getUser(0), this.userService.getUser(1), new Date('Mon Apr 18 2022 21:31:44 GMT-0300 (Horário Padrão de Brasília)'), 'Hello there', false),
      new Message(1, this.userService.getUser(1), this.userService.getUser(0), new Date('Mon Apr 18 2022 21:32:23 GMT-0300 (Horário Padrão de Brasília)'), 'General Kenobi!', false),
      new Message(2, this.userService.getUser(3), this.userService.getUser(5), new Date('Mon Apr 18 2022 21:32:44 GMT-0300 (Horário Padrão de Brasília)'), 'Hello, this is a test message.', false),
      new Message(3, this.userService.getUser(3), this.userService.getUser(5), new Date('Mon Apr 18 2022 21:32:59 GMT-0300 (Horário Padrão de Brasília)'), 'Hello, this is a second test message.', false),
      new Message(4, this.userService.getUser(3), this.userService.getUser(5), new Date('Mon Apr 18 2022 21:33:12 GMT-0300 (Horário Padrão de Brasília)'), 'Hello, this is a third test message.', false),
      new Message(5, this.userService.getUser(3), this.userService.getUser(5), new Date('Mon Apr 18 2022 21:33:32 GMT-0300 (Horário Padrão de Brasília)'), 'Hello, this is a fourth test message.', false),
      new Message(6, this.userService.getUser(3), this.userService.getUser(5), new Date('Mon Apr 18 2022 21:33:45 GMT-0300 (Horário Padrão de Brasília)'), 'Hello, this is a fifth test message.', false),
      new Message(7, this.userService.getUser(2), this.userService.getUser(5), new Date('Mon Apr 18 2022 21:33:55 GMT-0300 (Horário Padrão de Brasília)'), 'Hello, this is another test message.', false),
      new Message(8, this.userService.getUser(5), this.userService.getUser(2), new Date('Mon Apr 18 2022 21:34:15 GMT-0300 (Horário Padrão de Brasília)'), 'This is a nice test message.', false),
      new Message(9, this.userService.getUser(4), this.userService.getUser(5), new Date('Mon Apr 18 2022 21:34:57 GMT-0300 (Horário Padrão de Brasília)'), 'Wow, another test message.', false),
      new Message(10, this.userService.getUser(1), this.userService.getUser(5), new Date('Mon Apr 18 2022 21:35:10 GMT-0300 (Horário Padrão de Brasília)'), 'Hello mister.', false),
      new Message(11, this.userService.getUser(6), this.userService.getUser(5), new Date('Mon Apr 18 2022 21:35:24 GMT-0300 (Horário Padrão de Brasília)'), 'One last test message.', false),

    ]
  }

  getMessages([userA, userB]: User[], chat: Chat): Message[] {

    return this.fakeDb.filter((message: Message) => {
      if ((message.sender === userA || message.receiver === userA) &&
        (message.sender === userB || message.receiver === userB)) {
        message.chatId = chat;
        return true
      } else
        return false
    })
  }

  getMessage(id: number): Message {
    return this.fakeDb.filter((message: Message) => message.id === id)[0]
  }


  insertMessage(message: string, sender: User, receiver: User, chat: Chat): Message {
    const parentMessage = chat.messages.length > 0 ? this.getMessage(chat.messages[chat.messages.length - 1].id) : null;
    const newMsg = new Message(this.fakeDb.length, sender, receiver, new Date(), message, false, parentMessage)
    chat.insertMessage(newMsg)
    this.fakeDb.push(newMsg)
    this.subject.next(newMsg)

    return newMsg
  }

  onChange(): Observable<any> {
    return this.subject.asObservable()
  }

  async deleteMessagesByUser(user: User): Promise<boolean> {
    this.fakeDb.forEach((message: Message, index: number, arr: Message[]) => {
      if (message.sender === user || message.receiver === user) {
        arr.splice(index, 1)
      }
    })

    return true;
  }
}
