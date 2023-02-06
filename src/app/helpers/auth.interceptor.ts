import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenObject} from "../model/token-object.model";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokenObject: TokenObject = !!this.getLocalStorageToken()
      ? JSON.parse(this.getLocalStorageToken() || '{}')
      : JSON.parse(this.getSessionStorageToken() || '{}');

    if (tokenObject && tokenObject.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${tokenObject.tokenType} ${tokenObject.token}`
        }
      });
    }
    return next.handle(request);
  }

  private getLocalStorageToken() {
    return localStorage.getItem('tokenObject');
  }

  private getSessionStorageToken() {
    return sessionStorage.getItem('tokenObject');
  }
}
