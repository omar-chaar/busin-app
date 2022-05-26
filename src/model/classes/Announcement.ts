import { IAnnouncement } from "../interfaces/interfaces";
import { User } from "./User";

export class Announcement implements IAnnouncement{

    id: number;
    title: string;
    body: string;
    date: Date;
    read: boolean;
    sender: User;

    constructor(id: number, title:string, body:string, date:Date, sender: User){
        this.id = id;
        this.title = title;
        this.body = body;
        this.sender = sender;
        this.date = date;

        this.read = false;
    }
}