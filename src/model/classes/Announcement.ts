import { IAnnouncement } from "../interfaces/interfaces";
import { User } from "./User";

export class Announcement implements IAnnouncement{

    id: number;
    title: string;
    text: string;
    date: Date;
    read: boolean;
    sender: User;

    constructor(id: number, title:string, text:string, date:Date|string, sender: User){
        this.id = id;
        this.title = title;
        this.text = text;
        this.sender = sender;

        if(typeof date === 'string') this.date = new Date(date)
        else this.date = date;

        this.read = false;
    }
}