import { IChatGroup } from "../interfaces/interfaces";
import { ChatMessage } from "./ChatMessage";
import { Department } from "./Department";
import { User } from "./User";

export class ChatGroup implements IChatGroup{

    id: number;
    department: Department;
    participants: User[];
    read: boolean;
    lastMessage?: Date;

    constructor(id: number, department: Department, participants: User[], read: boolean, messages?: ChatMessage[]){
        this.id = id;
        this.department = department;
        this.participants = participants;
        this.read = read;
    }
}