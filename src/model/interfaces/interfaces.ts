import { ChatMessage } from "../classes/ChatMessage";
import { Company } from "../classes/Company";
import { department } from "../classes/department";
import { User } from "../classes/User";
import { Message } from "../classes/Message";
import { Chat } from "../classes/Chat";
import { ChatGroup } from "../classes/ChatGroup";

export interface IAnnouncement {
    id: number,
    title: string,
    text: string,
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
    department: department,
    admin: boolean,
    getFullName(): string,
}

export interface Idepartment {
    id: number,
    name: string,
    company: Company
}

export interface ICompany {
    id: number,
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
    department: department,
    participants: User[],
    read: boolean,
    lastMessage?: Date,
}