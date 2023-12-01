import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { inject } from '@angular/core';

export const authenticatedRoute: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const canVisit = authService.current_user ? true : false;

  if (canVisit) return true;

  router.navigate(['/']);
  return false;
};

export const unauthenticatedRoute: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const canVisit = !authService.current_user ? true : false;

  if (canVisit) return true;

  router.navigate(['/']);
  return false;
};
