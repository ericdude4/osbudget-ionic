import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

/** Pass untouched request through to the next request handler. */

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${this.authService.accessToken}`)
                .set('Content-Type', 'application/vnd.api+json')
                .set('Accept', 'application/vnd.api+json')
        });
        return next.handle(authReq);
    }
}