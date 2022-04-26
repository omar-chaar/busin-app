import { IChatGroup } from "../interfaces/interfaces";
import { ChatMessage } from "./ChatMessage";
import { department } from "./department";
import { User } from "./User";

export class ChatGroup implements IChatGroup{

    id: number;
    department: department;
    participants: User[];
    read: boolean;
    lastMessage?: Date;

    constructor(id: number, department: department, participants: User[], read: boolean, messages?: ChatMessage[]){
        this.id = id;
        this.department = department;
        this.participants = participants;
        this.read = read;
    }
}