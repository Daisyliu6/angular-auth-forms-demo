// login component contains all of the logic for validating the login form and handling form submission
// after logged in the normal users can see the home page and the detail page
// admin can see list and role pages 
// loginForm : FormGroup object defines the form controls and validators; used to access data entered into the form

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthService } from '@/_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    
    // specifies the dependencies that are required by the component as parameters
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        // if (this.authService.currentUserValue) { 
        //     this.router.navigate(['/']);
        // } 
}
    // lifecycle hook runs once after the component is created
    // create a new FormGroup by calling this.formBuilder.group() and assign it to the this.loginForm property
    // the parameters passed to the FormBuilder tell it to create 2 form controls username and password
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
          // form controls initialised with empty strings as values and set to required with the validator
            username: ['', Validators.required],
            password: ['', Validators.required]
        });  
        // reset login status
        this.authService.logout();      
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    // set this.submitted property to true to indicate that an attempt has been made to submit the form
    // this property is used in the login component template to display validation errors only after the first submission has been attempted
    
    onSubmit() {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
    // set the this.loading property to true before submitting the user credentials via the auth service
    // this property used in the login component template to display a loading spinner to the user and disable the login button
        this.loading = true;
        this.authService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                () => {
                    // this.router.navigate([this.returnUrl]);
                    this.router.navigateByUrl('/list');
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
