import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Book } from '../models/Book';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: `Bearer ${window.sessionStorage.getItem("token")}`
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

  getAllBooks(searchKey: string, pageIndex: number, pageSize: number, categories: string[], writers: string[], minPrice: number, maxPrice: number, sortBy: string, ascending: boolean): Observable<any> {
    let categoriesQueryString: string = "";
    let writersQueryString: string = "";

    categories.forEach(x => categoriesQueryString = categoriesQueryString.concat(`Categories=${x}&`))
    writers.forEach(x => writersQueryString = writersQueryString.concat(`Writers=${x}&`))

    return this.httpClient.get(`${this.apiURL}/GetAllBooks?PageIndex=${pageIndex}&SearchKey=${searchKey}&PageSize=${pageSize}&${categoriesQueryString}&${writersQueryString}SortBy=${sortBy}&Ascending=${ascending}&PriceStart=${minPrice}&PriceEnd=${maxPrice}`, httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  getAllCategory(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/GetAllCategory`, httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  getAllWriters(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/GetAllWriters`, httpOptions)
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
