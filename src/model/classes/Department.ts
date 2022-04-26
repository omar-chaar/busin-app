import { Idepartment } from "../interfaces/interfaces";
import { Company } from "./Company";

export class department implements Idepartment{

    id: number;
    name: string;
    company: Company;

    constructor(id:number, name: string, company:Company){
        this.id = id;
        this.name = name;
        this.company = company;
    }

}