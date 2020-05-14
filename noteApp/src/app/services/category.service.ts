import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://laboweb.ecam.be/notepad_s4/public/index.php/api/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) { }

  //The functions for handle error and extract response data.
  //Source: https://www.djamware.com/post/5b5cffaf80aca707dd4f65aa/building-crud-mobile-app-using-ionic-4-angular-6-and-cordova
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
    return this.http.get(apiUrl,httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getCategory(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  addCategory(data): Observable<any> {
    return this.http.post(apiUrl, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteCategory(id): Observable<any> {
    return this.http.delete(apiUrl + '/' + id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  editCategory(id, data): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}