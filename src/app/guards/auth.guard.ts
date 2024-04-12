import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let requiredRoles = route.data["roles"];
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }

    if (requiredRoles && !requiredRoles.includes(this.cookieService.get('role'))) {
      this.router.navigate(['/pagenotfound']);
      return false;
    }

    return true;
  }

}