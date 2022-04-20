import { Injectable } from '@angular/core';
import { IChat } from '../chat/chat.service';
import { IUser } from '../user/user.service';
import { UserService } from '../user/user.service';
import { Observable, Subject } from 'rxjs';

export interface IMessage{
  id: number,
  chatId: number,
  sender: IUser,
  text: string,
  date: any,
  read: boolean,
  parentMessage?: IMessage
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private subject = new Subject();
  fakeDb: IMessage[] = [
    {
      id: 0,
      chatId: 0,
      sender: this.userService.getUser(0), 
      text: 'Hello there!',
      date: new Date('Mon Apr 18 2022 21:31:44 GMT-0300 (Horário Padrão de Brasília)'),
      read: false,
      //parentMessage: null
    },
    {
      id: 1,
      chatId: 0,
      sender: this.userService.getUser(1), 
      text: 'General Kenobi!',
      date: new Date('Mon Apr 18 2022 21:32:23 GMT-0300 (Horário Padrão de Brasília)'),
      read: false,
      //parentMessage: this.getMessage(0)
    },
    {
      id: 2,
      chatId: 1,
      sender: this.userService.getUser(3), 
      text: 'Bom dia princesa, vc vai ver essa msg quando executar o projeto espero q os passarinhos estejam cantando e vc tenha um ótimo dia :* :*',
      date: new Date('Mon Apr 18 2022 21:32:44 GMT-0300 (Horário Padrão de Brasília)'),
      read: false,
      //parentMessage: null
    },
    {
      id: 3,
      chatId: 1,
      sender: this.userService.getUser(3), 
      text: 'Ainda tem algumas coisas pra fazer tipo ordenar os chats e mensagens de acordo com horário e confirmação de leitura, mas faço isso dps',
      date: new Date('Mon Apr 18 2022 21:32:59 GMT-0300 (Horário Padrão de Brasília)'),
      read: false,
      //parentMessage: this.getMessage(2)
    },
    {
      id: 4,
      chatId: 1,
      sender: this.userService.getUser(3), 
      text: 'Com ctz pode rolar alguns bugs com esses chats fakes, não estão perfeitos, então se vc ver algo estranho me envia',
      date: new Date('Mon Apr 18 2022 21:33:12 GMT-0300 (Horário Padrão de Brasília)'),
      read: false,
      //parentMessage: this.getMessage(3)
    },
    {
      id: 5,
      chatId: 1,
      sender: this.userService.getUser(3), 
      text: 'Tem um bug visual quando entra no chat, me parece ser coisa desse item-list do ionic, não sei direito como resolver, e o avatar fica espremido se o nome for mt grande',
      date: new Date('Mon Apr 18 2022 21:33:32 GMT-0300 (Horário Padrão de Brasília)'),
      read: false,
      //parentMessage: this.getMessage(4)
    },
    {
      id: 6,
      chatId: 1,
      sender: this.userService.getUser(3), 
      text: 'se vc quiser trocar o "usuario", vai no arquivo user.service e altera o id no construtor q altera aqui',
      date: new Date('Mon Apr 18 2022 21:33:45 GMT-0300 (Horário Padrão de Brasília)'),
      read: false,
      //parentMessage: this.getMessage(5)
    },
    {
      id: 7,
      chatId: 2,
      sender: this.userService.getUser(2), 
      text: "teste teste teste",
      date: new Date('Mon Apr 18 2022 21:34:04 GMT-0300 (Horário Padrão de Brasília)'),
      read: false,
      //parentMessage: null
    },
    {
      id: 8,
      chatId: 2,
      sender: this.userService.getUser(5), 
      text: "test teste test test",
      date: new Date('Mon Apr 18 2022 21:34:43 GMT-0300 (Horário Padrão de Brasília)'),
      read: false,
      //parentMessage: this.getMessage(7)
    },
    {
      id: 9,
      chatId: 3,
      sender: this.userService.getUser(4), 
      text: "odeio jovens mimados e ainda brancos",
      date: new Date('Mon Apr 18 2022 21:34:57 GMT-0300 (Horário Padrão de Brasília)'),
      read: false,
      //parentMessage: null
    },
    {
      id: 10,
      chatId: 4,
      sender: this.userService.getUser(1), 
      text: "coff...coff...",
      date: new Date('Mon Apr 18 2022 21:35:10 GMT-0300 (Horário Padrão de Brasília)'),
      read: false,
      //parentMessage: null
    },
    {
      id: 11,
      chatId: 5,
      sender: this.userService.getUser(6), 
      text: "+ teste",
      date: new Date('Mon Apr 18 2022 21:35:24 GMT-0300 (Horário Padrão de Brasília)'),
      read: false,
      //parentMessage: null
    },
    {
      id: 12,
      chatId: 5,
      sender: this.userService.getUser(5), 
      text: "sim, + teste",
      date: new Date('Mon Apr 18 2022 21:35:36 GMT-0300 (Horário Padrão de Brasília)'),
      read: false,
      //parentMessage: this.getMessage(11)
    },

  ]

  constructor(private userService: UserService) { 

  }

  getMessages(chat: IChat):IMessage[]{
    return this.fakeDb.filter((message: IMessage) => chat.id === message.chatId)
  }

  getMessage(id: number):IMessage{
    return this.fakeDb.filter((message: IMessage) => message.id === id)[0]
  }
  

  insertMessage(message:string, sender: IUser, chat:IChat):IMessage{
    const parentMessage = chat.messages.length > 0 ? this.getMessage(chat.messages[chat.messages.length-1].id) : null;
    const newMsg: IMessage = {
      id: this.fakeDb.length,
      chatId: chat.id,
      sender,
      text: message,
      date: new Date,
      read: false,
      parentMessage
    }
    this.fakeDb.push(newMsg)
    this.subject.next(newMsg)

    return newMsg
  }

  onChange(): Observable<any>{
    return this.subject.asObservable()
  }
}
