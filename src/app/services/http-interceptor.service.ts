import { HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService,
    private router: Router) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const Authorization = `Bearer ${this.userService.getToken()}`
    return next.handle(httpRequest.clone({ setHeaders: { Authorization } })).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.userService.setToken("");
          if (this.router.url !== "pages/login") {
            this.router.navigate(["pages/login"]);
          }
        }
        return throwError("401");
      })
    );
  }
}

