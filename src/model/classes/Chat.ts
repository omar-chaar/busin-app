import { Message } from "./Message";
import { User } from "./User";

export class Chat{

    id: number;
    message?: Message;
    unreads?: number;
    user?: any;
    constructor(id: number, message?: Message, unreads?: number, user?: any){
        this.id = id;
        if(unreads) this.unreads = unreads;
        if(message){
            this.message = message;
        }
        this.user = user;
    }
    
    
}