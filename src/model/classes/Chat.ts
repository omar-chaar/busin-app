import { IChat } from "../interfaces/interfaces";
import { Message } from "./Message";
import { User } from "./User";

export class Chat implements IChat{

    id: number;
    messages?: Message[] = [];
    unreads?: number;
    lastMessage?: Date;

    constructor(id: number, messages?: Message[], unreads?: number){
        this.id = id;
        if(unreads) this.unreads = unreads;
        if(messages){
            this.messages = messages;
            this.lastMessage = messages[messages.length-1].time;
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