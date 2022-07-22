import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserManagementService } from './user-management.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private userManagementService: UserManagementService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.userManagementService.userData) {
      const tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userManagementService.userData.token}`
        }
      })
      return next.handle(tokenizedReq);
    }
    return next.handle(req);
  }
}
