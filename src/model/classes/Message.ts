import { IMessage } from "../interfaces/interfaces";
import { Chat } from "./Chat";
import { User } from "./User";

export class Message implements IMessage {

    id: number;
    sender: any;
    receiver: any;
    time: Date;
    message: string;
    was_seen: boolean;
    parentMessage?: any;
    chatId?: Chat;

    constructor(id: number, sender: any, receiver: any, time: Date | string, message: string, was_seen: boolean, parentMessage?: any) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
        this.was_seen = was_seen;

        if (typeof time === 'string') {
            //add one hour to time
            this.time = new Date(time);
            this.time.setHours(this.time.getHours() + 1);            
        }
        else this.time = time;

        if (parentMessage) this.parentMessage = parentMessage;
    }


}