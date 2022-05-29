export class ChatMessage{

    id: number;
    sender: number;
    department_id: number;
    time: Date;
    body: string;
    sender_name:string;
    department_name: string;

    constructor(id:number, sender:number, department_id: number, time: Date|string, body:string, sender_name: string,
        department_name: string){
        this.id = id;
        this.sender = sender;
        this.department_id = department_id;
        this.body = body;
        this.sender_name = sender_name;
        this.department_name = department_name;

        if(typeof time === 'string'){
            this.time = new Date(time);
        }
        else this.time = time;
    }
}