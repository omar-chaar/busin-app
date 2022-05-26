import { ICompany } from "../interfaces/interfaces";

export class Company implements ICompany{

    company_id: number;
    name: string;
    
    constructor(id:number, name:string){
        this.company_id = id;
        this.name = name;
    }

}