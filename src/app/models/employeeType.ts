export class EmployeeType {
    employeeTypeID: number;
    name: string;
    description: string;
    employees: [];
}

//Only for sending to CREATE or UPDATE 
//When receiving you use ANY
