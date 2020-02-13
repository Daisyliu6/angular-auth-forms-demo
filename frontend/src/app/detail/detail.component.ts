import { Component, OnInit, Input } from '@angular/core';
import { User } from '@/_models';
import { UserService, AuthService, RoleService, AlertService } from '@/_services';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Role } from '@/_models';
// 28 added
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'detail.component.html' })

export class DetailComponent implements OnInit {
  currentUser: User;
  @Input() user: User;
  roles: Role[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    public userService: UserService,
    public roleService: RoleService,
    private location: Location,
    // added 31
    private alertService: AlertService
) { this.currentUser = this.authService.currentUserValue; }
 
ngOnInit(): void {
  this.getUser(),
  // 28 added
  this.getRole()
}

get isAdmin() {
  return this.currentUser && this.currentUser.role == 'Admin';
}

getUser(): void {
  const id = this.route.snapshot.paramMap.get('id');
  this.userService.getById(id)
  .subscribe(user => this.user = user);
}

private getRole(): void {
   this.roleService.getAllRole()
   .pipe(first())
   .subscribe(roles => this.roles = roles);
}

goBack(): void {
  this.location.back();
}

updateDetail(): void {
  this.userService.updateUser(this.user._id, this.user)
  .subscribe(
    () => {
      this.alertService.success('Update successfully', true);
      this.goBack();
      },
      error => {
        this.alertService.error(error);
      });
    }
}