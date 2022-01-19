import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor
{
    jwtToken : String = "";

    constructor() { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.jwtToken != "") {
            req = req.clone({ setHeaders: { Authorization: `Bearer ${this.jwtToken}` }});
        };
        return next.handle(req).pipe(tap(
            (evt : HttpEvent<any>) => {
                if (evt instanceof HttpResponse) {
                    let tab : Array<String> ;
                    let headerAuth = evt.headers.get("Authorization");
                    if (headerAuth != null ) {
                        tab = headerAuth.split(/Bearer\s+(.*)$/i);
                        if (tab.length > 1) {
                            this.jwtToken = tab [1]; 
                        }
                    }
                };
                
            },
            (error: HttpErrorResponse) => {
                switch (error.status) {
                    case 400:
                    case 401:
                }
                return of(null);
            }
        ));    
    }
}