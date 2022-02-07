import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {

  constructor(protected router: Router, protected authService: AuthService) { }

  canActivate(route :any, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) { return true; }

    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
