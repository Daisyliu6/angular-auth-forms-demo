import { Injectable } from '@angular/core';
// import { Router, CanActivate } from '@angular/router';
import { AuthService } from '@/_services';
import { Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const currentUser = this.authService.currentUserValue;
      if (currentUser.role == 'Admin') {
        // this.router.navigate(['/list']);
        return true;
      }
      // navigate to home page if not admin
      this.router.navigate(['/']);
      return false;
    }
}

