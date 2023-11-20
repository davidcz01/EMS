import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private testApiUrl = 'https://localhost:7254/api/Employee/GetFakeData';
  private employeeData = 'https://localhost:7254/api/Employee/GetEmployeeData';
  private updateEmployeeUrl =
    'https://localhost:7254/api/Employee/UpdateEmployee/{id}';
  private apiUrl = 'https://localhost:7254/api/Employee/AddEmployee';
  private deleteEmployeeUrl =
    'https://localhost:7254/api/Employee/DeleteEmployee';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  addEmployee(employee: Employee): Promise<Employee> {
    return firstValueFrom(this.http.post<Employee>(this.apiUrl, employee));
  }

  GetFakeData(): Observable<any> {
    return this.http.get<any>(`${this.testApiUrl}`);
  }

  GetEmployeeData(): Observable<any> {
    return this.http.get<any[]>(this.employeeData);
  }

  GetEmployeeByID(id: any) {
    return this.http.get('https://localhost:7254/api/Employee/' + id);
  }

  UpdateEmployee(id: number, employee: Employee): Promise<Employee> {
    const url = `${this.updateEmployeeUrl.replace('{id}', id.toString())}`;
    return firstValueFrom(
      this.http.put<Employee>(url, employee, this.httpOptions)
    );
  }

  DeleteEmployee(EmployeeID: number): Promise<void> {
    const url = `${this.deleteEmployeeUrl}?id=${EmployeeID}`;
    return firstValueFrom(this.http.delete<void>(url, this.httpOptions));
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.deleteEmployeeUrl}/${id}`);
  }
}
