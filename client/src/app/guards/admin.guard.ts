import { Injectable } from '@angular/core';
import {  Router, CanActivate  } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { UserManagementService } from '../services/user-management.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userManagementService: UserManagementService, private _router: Router) {}

  canActivate(): boolean {
    if(this.userManagementService.userData == null) {
      this._router.navigateByUrl('/');
      return false
    } 

    const decoded: any = jwtDecode(this.userManagementService.userData.token);
    if (decoded.role == 'admin') return true;
    
    
    return false;
  }
  
}
