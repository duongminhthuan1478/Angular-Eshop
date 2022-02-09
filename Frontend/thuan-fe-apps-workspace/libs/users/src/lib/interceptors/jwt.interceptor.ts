import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@thuan-env/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._auth.getToken();
    const isApiUrl = request.url.startsWith(environment.API_URL)
    if(token && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      })
    }
    return next.handle(request);
  }
}
