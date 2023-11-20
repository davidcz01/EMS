import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee = null!;

  employee: Employee = {
    // employeeID: 0,
    departmentName: '',
    firstName: '',
    surname: '',
    email: '',
    date: new Date(),
    holidayEntitlement: 0,
    departmentID: 0,
  };

  showModal1 = false;
  showModal2 = false;
  showModal3 = false;

  constructor(private apiService: ApiService) {}

  public ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.apiService.GetEmployeeData().subscribe(
      (result) => {
        this.employees = result;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  public addNewEmployee() {
    this.apiService
      .addEmployee(this.employee)
      .then(() => {
        this.closeAddModal();
        this.loadData();
        console.log('Adding employee');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  editEmployee() {
    if (
      this.selectedEmployee &&
      this.selectedEmployee.employeeID !== undefined
    ) {
      const employeeId: number = this.selectedEmployee.employeeID;

      const updatedEmployeeData: Employee = {
        departmentName: this.selectedEmployee.departmentName,
        firstName: this.selectedEmployee.firstName,
        surname: this.selectedEmployee.surname,
        email: this.selectedEmployee.email,
        date: this.selectedEmployee.date,
        holidayEntitlement: this.selectedEmployee.holidayEntitlement,
        departmentID: this.selectedEmployee.departmentID,
      };

      this.apiService
        .UpdateEmployee(employeeId, updatedEmployeeData)
        .then((updatedEmployee) => {
          // Handle success
          console.log('Employee updated successfully:', updatedEmployee);
          this.closeAddModal();
          this.loadData();
        })
        .catch((error) => {
          // Handle error
          console.error('Error updating employee:', error);
        });
    } else {
      console.error('Invalid employee ID');
    }
  }

  deleteEmployee() {
    if (
      this.selectedEmployee &&
      this.selectedEmployee.employeeID !== undefined
    ) {
      const employeeId: number = this.selectedEmployee.employeeID;

      this.apiService
        .DeleteEmployee(employeeId)
        .then(() => {
          this.closeDeleteModal();
          this.loadData();
          console.log('Deleting employee');
        })
        .catch((error) => {
          if (error.status === 404) {
            console.log(
              'Employee not found. It might have been deleted by another user.'
            );
          } else {
            console.error('Error deleting employee:', error);
          }
        });
    } else {
      console.error('Invalid employee ID');
    }
  }

  isValidEmployee(employee: Employee): boolean {
    if (!employee.departmentName || !employee.firstName || !employee.email) {
      return false;
    }
    return true;
  }

  openAddModal() {
    this.showModal1 = true;
  }
  openEditModal(employee: Employee) {
    this.selectedEmployee = { ...employee };
    this.showModal2 = true;
  }

  closeAddModal() {
    this.showModal1 = false;
  }
  closeEditModal() {
    this.showModal2 = false;
  }

  openDeleteModal(employee: Employee) {
    this.selectedEmployee = { ...employee };
    this.showModal3 = true;
  }
  closeDeleteModal() {
    this.showModal3 = false;
  }

  fetchSomeData(): void {
    this.apiService.GetFakeData().subscribe(
      (data) => {
        console.log('Received data:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  formatDate(dateString: string): string {
    // Assuming dateString is in "yyyy-MM-dd" format
    const dateObject = new Date(dateString);
    return dateObject.toISOString().substring(0, 10);
  }
}
