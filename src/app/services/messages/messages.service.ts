import { Injectable } from '@angular/core';
import { IChat } from '../chat/chat.service';
import { IUser } from '../user/user.service';
import { UserService } from '../user/user.service';

export interface IMessage{
  chatId: number,
  sender: IUser,
  text: string,
  date: string,
  time: string,
  read: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  fakeDb: IMessage[] = [
    {
      chatId: 0,
      sender: this.userService.getUser(0), 
      text: 'Hello there!',
      date: '17/04/2022',
      time: '17:47',
      read: false,
    },
    {
      chatId: 0,
      sender: this.userService.getUser(1), 
      text: 'General Kenobi!',
      date: '17/04/2022',
      time: '17:47',
      read: false,
    },
    {
      chatId: 1,
      sender: this.userService.getUser(3), 
      text: 'Bom dia princesa, vc vai ver essa msg quando executar o projeto espero q os passarinhos estejam cantando e vc tenha um ótimo dia :* :*',
      date: '17/04/2022',
      time: '17:47',
      read: false,
    },
    {
      chatId: 1,
      sender: this.userService.getUser(3), 
      text: 'Ainda tem algumas coisas pra fazer tipo ordenar os chats e mensagens de acordo com horário e confirmação de leitura, mas faço isso dps',
      date: '17/04/2022',
      time: '17:47',
      read: false,
    },
    {
      chatId: 1,
      sender: this.userService.getUser(3), 
      text: 'Com ctz pode rolar alguns bugs com esses chats fakes, não estão perfeitos, então se vc ver algo estranho me envia',
      date: '17/04/2022',
      time: '17:47',
      read: false,
    },
    {
      chatId: 1,
      sender: this.userService.getUser(3), 
      text: 'Tem um bug visual quando entra no chat, me parece ser coisa desse item-list do ionic, não sei direito como resolver, e o avatar fica espremido se o nome for mt grande',
      date: '17/04/2022',
      time: '17:47',
      read: false,
    },
    {
      chatId: 1,
      sender: this.userService.getUser(3), 
      text: 'se vc quiser trocar o "usuario", vai no arquivo user.service e altera o id no construtor q altera aqui',
      date: '17/04/2022',
      time: '17:47',
      read: false,
    },
    {
      chatId: 2,
      sender: this.userService.getUser(2), 
      text: "teste teste teste",
      date: '17/04/2022',
      time: '18:50',
      read: false,
    },
    {
      chatId: 2,
      sender: this.userService.getUser(5), 
      text: "test teste test test",
      date: '17/04/2022',
      time: '18:51',
      read: false,
    },
    {
      chatId: 3,
      sender: this.userService.getUser(4), 
      text: "odeio jovens mimados e ainda brancos",
      date: '17/04/2022',
      time: '19:55',
      read: false,
    },
    {
      chatId: 4,
      sender: this.userService.getUser(1), 
      text: "coff...coff...",
      date: '17/04/2022',
      time: '22:00',
      read: false,
    },
    {
      chatId: 5,
      sender: this.userService.getUser(6), 
      text: "+ teste",
      date: '17/04/2022',
      time: '20:00',
      read: false,
    },
    {
      chatId: 5,
      sender: this.userService.getUser(5), 
      text: "sim, + teste",
      date: '17/04/2022',
      time: '20:05',
      read: false,
    },

  ]

  constructor(private userService: UserService) { }

  getMessages(chat: IChat):IMessage[]{
    return this.fakeDb.filter((message: IMessage) => chat.id === message.chatId)
  }

  insertMessage(message:string, sender: IUser, chat:IChat):IMessage{
    console.log('chat id: ' + chat.id)
    const newMsg: IMessage = {
      chatId: chat.id,
      sender,
      text: message,
      date: '20/04/2022',
      time: '20:04',
      read: false
    }
    this.fakeDb.push(newMsg)
    console.log(this.fakeDb)

    return newMsg
  }
}
