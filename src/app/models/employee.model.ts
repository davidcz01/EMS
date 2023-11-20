export class Employee {
  employeeID?: number;
  departmentName: string;
  firstName: string;
  surname: string;
  email: string;
  date: Date;
  holidayEntitlement: number;
  departmentID: number; // Match the foreign key name
  department?: Department; // Optional, assuming Department is another model/interface

  constructor(employee: Employee) {
    this.employeeID = employee.employeeID;
    this.departmentName = employee.departmentName;
    this.firstName = employee.firstName;
    this.surname = employee.surname;
    this.email = employee.email;
    this.date = employee.date;
    this.holidayEntitlement = employee.holidayEntitlement;
    this.departmentID = employee.departmentID;
    this.department = employee.department;
  }
}

// Assuming you have a Department model/interface
export class Department {
  // Define the properties of the Department model
  // You may need to adjust this based on your actual Department model
  departmentID?: number;
  // Add other properties as needed
}
