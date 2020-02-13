import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { RoleService } from '@/_services';
import { Role } from '@/_models';
import { AlertService } from '@/_services';

@Component({ templateUrl: 'role.component.html' })
export class RoleComponent implements OnInit {
    roles: Role[];
    isLoading: Boolean;

    constructor( 
      private roleService: RoleService,
      private alertService: AlertService
      ){ }

    ngOnInit() { 
      this.isLoading = true;
      this.roleService.getAllRole().pipe(first()).subscribe(roles => {
      this.isLoading = false;
      this.roles = roles; 
    });
    }

   loadAllRoles() {
    this.roleService.getAllRole()
    .pipe(first())
    .subscribe(roles => this.roles = roles);
    }

    addNewRole(role: string): void {
      this.roleService.addRole({ role } as Role)
      // .pipe(first())
      .subscribe(
        (role) => {
        this.roles.push(role);
        // console.log(role);
        // 30 added
        this.loadAllRoles();
        this.alertService.success('Add role successfully', true);
         },
        error => {
          this.alertService.error(error);
          this.isLoading = false;
      });
    }

    deleteSelectedRole(role: Role): void {
      // this.alertService.clear();
      this.roleService.deleteRole(role)
      .pipe(first())
      .subscribe(
        () => {this.loadAllRoles();
        this.alertService.success('Delete role successfully', true);
        }, 
        error => {
          this.alertService.error(error);
          this.isLoading = false;
      });
   } 
}