import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl = 'http://laboweb.ecam.be/notepad_s4/public/index.php/api/categories';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('error');
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl,httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getCategory(id: string): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  newCategory(data): Observable<any> {
    return this.http.post(this.apiUrl, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteCategory(id): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  editCategory(id, data): Observable<any> {
    return this.http.put(this.apiUrl + '/' + id, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}