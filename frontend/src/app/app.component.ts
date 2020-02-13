// subcribe to the currentUser observable in the authentication service 
// so it can relatively show/hide the main navigation bar when the user logs in/out

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services';
import { User } from './_models';
// 3/2 added
import './app.less';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
  // the currentUser property used to show/hide the nav when the user is logged in/out
    currentUser: User;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        this.authService.currentUser.subscribe(x => this.currentUser = x);
    }

    get isAdmin() {
      return this.currentUser && this.currentUser.role == 'Admin';
    } 

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}