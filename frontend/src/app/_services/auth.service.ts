// RxJS Subjects and Observables are used to store the current user object 
// and notify other components when the user logs in and out of the app
// currentUserValue property can be used when you just want to get the current value 
// of the logged in user 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuthService {
    
// BehaviorSubject special type of subjeect that keep hold of hte current value 
// and emits it to any new subscribers as soon as they subscribe

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    // 31 added
    clear(): void {
        localStorage.clear();
      }
    
    // getter allows other components an easy way to get the value of the currently logged in user 
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    // send the user credentials to the API via an HTTP POST request for authentication
    login(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if (user && user.token ) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        // 30 added
        // this.isLoggedIn = false;
    }
}