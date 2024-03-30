import {
  HTTP_INTERCEPTORS,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider, inject } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authService = inject(AuthService);

    if (
      authService.isLoggedIn() &&
      !req.url.includes('https://accounts.google.com')
    ) {
      const authReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + authService.getIdToken()
        ),
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}

export const authInterceptor: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
