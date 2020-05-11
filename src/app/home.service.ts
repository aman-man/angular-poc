import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IEmployee } from './models/iemployee';
// import { IEmployee } from './'


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  employee
  url = ''

  // // Handle API errors
  // handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // };
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<IEmployee[]> {
   return this.http.get<IEmployee[]>('http://localhost:4243/employee');
  }
  // getEmployees(): Observable<IEmployee> {
  //   return this.http
  //     .get<IEmployee>('http://localhost:4243/employee')
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     )
  // }

  saveEmployeeDetail(employeeDetail: IEmployee) {
    employeeDetail.id= null;
    return this.http.post('http://localhost:4243/employee', employeeDetail);
  }

  removeEmployeeDetail(EmployeeId: Number) {
    return this.http.delete(`http://localhost:4243/employee/${EmployeeId}`);
  }

  updateEmployeeDetail(updatedEmployeeDetail) {
    return this.http.put(`http://localhost:4243/employee/${updatedEmployeeDetail.id}`, updatedEmployeeDetail);
  }
}
