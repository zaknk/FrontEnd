import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

export const authGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.user != null) {
    return true;
  }


  return router.parseUrl('');

}
