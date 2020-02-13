// user service handles all HTTP communication with the backend for CRUD operations on user data
// user service to demonstrate accessing secure api endpoints with the http authorization header set after logging in
// to the application, the auth header is set with a JWT token in the JWT Interceptor 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

  // register() method accepts a user object parameter containing the user details from the registration form
  // send POST request to the register route on the backend (`${config.apiUrl}/users/register`) 
  // passing the user object in the request body
  register(user: User) {
    return this.http.post(`${config.apiUrl}/users/register`, user);
  }

  getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
  }

  // new added lines
  getById(id: string) {
      return this.http.get<User>(`${config.apiUrl}/users/${id}`);
  }

  updateUser(id: string, user: User) {
      return this.http.put(`${config.apiUrl}/users/${id}`, user);
  }

  delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
  }

}