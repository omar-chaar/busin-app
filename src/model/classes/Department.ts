import { IDepartment } from "../interfaces/interfaces";
import { Company } from "./Company";

export class Department implements IDepartment{

    department_id: number;
    name: string;
    company: Company;
    users?: any[];

    constructor(id:number, name: string, company:Company){
        this.department_id = id;
        this.name = name;
        this.company = company;
    }

}