import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Book } from '../models/Book';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: `Bearer ${localStorage.getItem("AccessToken")}`
  })
};

@Injectable({
  providedIn: 'root'
})

export class LibraryService {

  private apiURL = "https://localhost:7278/api/Book";

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllBooks(pageIndex: number, pageSize: number): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/GetAllBooks?PageIndex=${pageIndex}&PageSize=${pageSize}&SortBy=createdDate&PriceStart=0&PriceEnd=10000`, httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  addNewBook(book: any): Observable<any> {
    console.log(book);
    return this.httpClient.post<any>(this.apiURL + '/CreateBook', book, httpOptions)
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
