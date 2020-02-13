import { Component, OnInit } from '@angular/core';
import { User } from '@/_models';
import { AuthService, UserService} from '@/_services';
import { first } from 'rxjs/operators';
// 3/02 added
import { Router} from '@angular/router';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  loading = false;
  currentUser: User;
  
    constructor(
        private authService: AuthService,
        private userService: UserService,
        // 3/02 added
        private router: Router
    ) 
    { this.currentUser = this.authService.currentUserValue; }
   
    ngOnInit() {
        this.loading = true;
        this.userService.getById(this.currentUser._id).pipe(first())
        .subscribe(
        () => { 
        if (this.currentUser.role == 'Admin') {
        this.router.navigateByUrl('/');
       }
          this.loading = false; 
        });    
    }
}