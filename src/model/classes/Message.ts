import { IMessage } from "../interfaces/interfaces";
import { Chat } from "./Chat";
import { User } from "./User";
import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from "date-fns-tz";

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
            this.time = this.formatDate(time);
        }
        else this.time = time;

        if (parentMessage) this.parentMessage = parentMessage;
    }


    formatDate(value) {
        const date = new Date(value);
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log(formatInTimeZone(date, timezone, 'yyyy-MM-dd HH:mm:ssXXX'))
        return new Date(formatInTimeZone(date, timezone, 'yyyy-MM-dd HH:mm:ssXXX'));
    }


}