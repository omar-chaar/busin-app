import { IChatGroup } from "../interfaces/interfaces";
import { ChatMessage } from "./ChatMessage";
import { Departament } from "./Departament";
import { User } from "./User";

export class ChatGroup implements IChatGroup{

    id: number;
    departament: Departament;
    participants: User[];
    read: boolean;
    lastMessage?: Date;

    constructor(id: number, departament: Departament, participants: User[], read: boolean, messages?: ChatMessage[]){
        this.id = id;
        this.departament = departament;
        this.participants = participants;
        this.read = read;
    }
}