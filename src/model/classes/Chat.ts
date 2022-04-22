import { IChat } from "../interfaces/interfaces";
import { Message } from "./Message";
import { User } from "./User";

export class Chat implements IChat{

    id: number;
    participants: User[];
    messages?: Message[] = [];
    read: boolean;
    lastMessage?: Date;

    constructor(id: number, participants: User[], read: boolean, messages?: Message[]){
        this.id = id;
        this.participants = participants;
        this.read = read;
        if(messages){
            this.messages = messages;
            this.lastMessage = messages[messages.length].time;
        }
    }

    loadMoreMessages(messages: Message[]):void{
        this.messages.unshift(...messages)
    }

    insertMessage(message: Message):void{
        this.messages.push(message)
        this.lastMessage = new Date()
    }
}