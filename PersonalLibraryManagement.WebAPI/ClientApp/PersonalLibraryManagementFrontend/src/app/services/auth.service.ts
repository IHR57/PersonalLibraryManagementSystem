import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiURL = "https://localhost:7278/api/Account/";

  constructor(
    private httpClient: HttpClient
  ) { }

  registerNewUser(user: User): Observable<any> {
    return this.httpClient.post<User>(this.apiURL + 'Register', user, httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  login(email: string, password: string): Observable<any> {
    const loginRequest =  {
      'email': email,
      'password': password
    };

    return this.httpClient.post<any>(this.apiURL + 'Login', loginRequest, httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
