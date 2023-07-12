import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard = (next: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const isLogged = inject(AuthService).isLogged();
  return isLogged ? true : router.navigate(['auth/login']);
};

export const noAuthGuard = (next: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const isLogged = inject(AuthService).isLogged();
  return isLogged ? router.navigate(['admin/actualite']) : true;
};
