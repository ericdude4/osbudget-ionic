import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("here")
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer test`)
                .set('Content-Type', 'application/vnd.api+json')
                .set('Accept', 'application/vnd.api+json'),
            withCredentials: true,
        });
        console.log(authReq)
        return next.handle(authReq);
    }
}