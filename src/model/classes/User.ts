import { IUser } from "../interfaces/interfaces";
import { Departament } from "./Departament";

export class User implements IUser{

    id: number;
    name: string;
    surname: string;
    position: string;
    email: string;
    profilePicture: string;
    departament: Departament;
    admin: boolean;

    constructor(id:number, name:string, surname:string, position:string,
                email: string, profilePicture:string, departament:Departament, admin:boolean){
            this.id = id;
            this.name = name;
            this.surname = surname;
            this.position = position;
            this.email = email;
            this.profilePicture = profilePicture;
            this.departament = departament;
            this.admin = admin;
    }

    getFullName(): string {
        return `${this.name} ${this.surname}`;
    }
}