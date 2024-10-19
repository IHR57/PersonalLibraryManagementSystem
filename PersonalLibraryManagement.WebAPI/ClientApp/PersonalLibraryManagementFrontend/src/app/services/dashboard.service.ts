import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiURL = 'https://localhost:7278/api/Dashboard';

  constructor(private httpClient: HttpClient) {}

  getYearlyTotalExpenses(): Observable<any> {
    return this.httpClient
      .get(`${this.apiURL}/GetYearlyExpenses`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getCategoryWiseTotalExpenses(): Observable<any> {
    return this.httpClient
      .get(`${this.apiURL}/GetCategoryWiseExpenses`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
