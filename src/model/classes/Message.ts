import { IMessage } from "../interfaces/interfaces";
import { Chat } from "./Chat";
import { User } from "./User";

export class Message implements IMessage{

    id: number;
    sender: User;
    receiver: User;
    time: Date;
    message: string;
    read: boolean;
    parentMessage?: Message;
    chatId?: Chat;

    constructor(id:number, sender:User, receiver:User, time: Date|string, message:string, read: boolean, parentMessage?: Message){
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
        this.message = message;
        this.read = read;

        if(typeof time === 'string') this.time = new Date(time)
        else this.time = time;

        if(parentMessage) this.parentMessage = parentMessage;
    }

}