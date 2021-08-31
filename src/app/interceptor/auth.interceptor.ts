import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "../service/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes(`${this.authenticationService.host}/user/login`) ||
            request.url.includes(`${this.authenticationService.host}/user/register`)) 
        {
            return next.handle(request);
        }

        this.authenticationService.loadToken();
        const token = this.authenticationService.getToken();
        const authorizationRequest = request.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
        return next.handle(authorizationRequest);
    }
   
}