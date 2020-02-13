// logic for displaying the users list
// a list of all users and enables the deletion/details of users
// call the user service to get all users from a secure endpoint and store them in a local users property 

import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '@/_models';
import { UserService, AlertService } from '@/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  loading = false;
  users: User[] = [];
    
    constructor( 
        private userService: UserService,
        private alertService: AlertService
         ) { }
   
    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
           this.loading = false;
           this.users = users;
        });
    }

    deleteUser(id: number) {
      this.alertService.clear();
        this.userService.delete(id)
        .pipe(first())
        .subscribe(
        () => {
            this.alertService.success('Delete user successfully', true);
            this.loadAllUsers();
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
    }

    private loadAllUsers() {
        this.userService.getAll()
        .pipe(first())
        .subscribe(users => this.users = users);
    }
}