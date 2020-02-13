import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
        // // The original url is accessible in the auth guard via the 
        // // 'state: RouterStateSnapshot' parameter that is passed to the canActivate() method.
        // //   if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
        // //     // role not authorised so redirect to home page
        // //     // console.log(route.data)
        // //     this.router.navigate(['/']);
        // //     return false;
        // //   } 
            return true;
        }
        // not logged in so redirect to login page with the return url
        // 3/02 modified
        // this will result in a url like this: http://localhost:8080/login?returnUrl=%2F
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        // delte queryParams no impact
        this.router.navigate(['/login']);
        return false;
    }
}