import { IDepartament } from "../interfaces/interfaces";
import { Company } from "./Company";

export class Departament implements IDepartament{

    id: number;
    name: string;
    company: Company;

    constructor(id:number, name: string, company:Company){
        this.id = id;
        this.name = name;
        this.company = company;
    }

}