import { IDepartment } from "../interfaces/interfaces";
import { Company } from "./Company";

export class Department implements IDepartment{

    id: number;
    name: string;
    company: Company;

    constructor(id:number, name: string, company:Company){
        this.id = id;
        this.name = name;
        this.company = company;
    }

}