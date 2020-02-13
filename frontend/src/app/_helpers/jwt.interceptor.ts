// intercept http requests from the app to add a JWT auth token to the Authorization header
// if the user is  logged in
// 
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if user is logged in and request is to api url
        let currentUser = this.authService.currentUserValue;
        // const currentUser = this.authService.currentUserValue;
        // const isLoggedIn = currentUser && currentUser.token;
        // const isApiUrl = request.url.startsWith(config.apiUrl);
        if (currentUser && currentUser.token) {
          // if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        return next.handle(request);
    }
}