import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateChildFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  try {
    const decoded: any = jwtDecode(token);

    if ((decoded.exp ?? 0) <= Date.now() / 1000) {
      localStorage.removeItem('token');
      return router.createUrlTree(['/login']);
    }

    return true;
  } catch {
    localStorage.removeItem('token');
    return router.createUrlTree(['/login']);
  }
};