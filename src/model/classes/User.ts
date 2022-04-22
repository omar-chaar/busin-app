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

    constructor(id:number, name:string, surname:string, position:string,
                email: string, profilePicture:string, departament:Departament){
            this.id = id;
            this.name = name;
            this.surname = surname;
            this.position = position;
            this.email = email;
            this.profilePicture = profilePicture;
            this.departament = departament;
    }

    getFullName(): string {
        return `${this.name} ${this.surname}`;
    }
}