import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

//todo: why is this not working?
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted request to ' + req.url);
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
