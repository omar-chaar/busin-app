import { ICompany } from "../interfaces/interfaces";

export class Company implements ICompany{

    id: number;
    name: string;
    
    constructor(id:number, name:string){
        this.id = id;
        this.name = name;
    }

}