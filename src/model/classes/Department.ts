import { IDepartment } from "../interfaces/interfaces";

export class Department implements IDepartment{

    department_id: number;
    name: string;
    company_id: number;
    users?: any[];

    constructor(id:number, name: string, company_id:number){
        this.department_id = id;
        this.name = name;
        this.company_id = company_id;
    }

}