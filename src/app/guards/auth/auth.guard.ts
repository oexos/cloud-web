import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn() === true) {
    //TODO change to authService.isLoggedIn() === true after testing
    return true;
  }
  return router.parseUrl('/login');
};
