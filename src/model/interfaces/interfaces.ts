import { ChatMessage } from "../classes/ChatMessage";
import { Company } from "../classes/Company";
import { Department } from "../classes/Department";
import { User } from "../classes/User";
import { Message } from "../classes/Message";
import { Chat } from "../classes/Chat";
import { ChatGroup } from "../classes/ChatGroup";

export interface IAnnouncement {
    id: number,
    title: string,
    body: string,
    date: Date,
    read: boolean,
    sender: User,
}

export interface IUser {
    id: number,
    name: string,
    surname: string,
    position: string,
    email: string,
    profilePicture: string,
    department_id: number,
    admin: boolean,
    getFullName(): string,
}

export interface IDepartment {
    department_id: number,
    name: string,
    company_id: number
}

export interface ICompany {
    company_id: number,
    name: string,
}

export interface IMessage {
    id: number,
    sender: User,
    receiver: User,
    time: Date,
    message: string,
    read: boolean,
    parentMessage?: Message,
    chat?: Chat,
}

export interface IChatMessage {
    id: number,
    sender: User,
    group: ChatGroup,
    time: Date,
    message: string,
    parentMessage?: ChatMessage;
}

export interface IChat {
    id: number,
    participants: User[],
    messages?: Message[],
    unreads?: number,
    lastMessage?: Date,
}

export interface IChatGroup{
    id: number,
    department: Department,
    participants: User[],
    read: boolean,
    lastMessage?: Date,
}