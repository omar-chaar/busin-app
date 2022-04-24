import { IChatMessage } from "../interfaces/interfaces";
import { ChatGroup } from "./ChatGroup";
import { User } from "./User";

export class ChatMessage implements IChatMessage{

    id: number;
    sender: User;
    group: ChatGroup;
    time: Date;
    message: string;
    parentMessage?: ChatMessage;

    constructor(id:number, sender:User, group: any, time: Date|string, message:string, parentMessage?: ChatMessage){
        this.id = id;
        this.sender = sender;
        this.group = group;
        this.message = message;

        if(typeof time === 'string') this.time = new Date(time)
        else this.time = time;

        if(parentMessage) this.parentMessage = parentMessage;
    }
}