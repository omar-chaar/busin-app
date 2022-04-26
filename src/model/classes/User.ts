import { IUser } from "../interfaces/interfaces";
import { department } from "./department";

export class User implements IUser{

    id: number;
    name: string;
    surname: string;
    position: string;
    email: string;
    profilePicture: string;
    department: department;
    admin: boolean;

    constructor(id:number, name:string, surname:string, position:string,
                email: string, profilePicture:string, department:department, admin:boolean){
            this.id = id;
            this.name = name;
            this.surname = surname;
            this.position = position;
            this.email = email;
            this.profilePicture = profilePicture;
            this.department = department;
            this.admin = admin;
    }

    getFullName(): string {
        return `${this.name} ${this.surname}`;
    }
}