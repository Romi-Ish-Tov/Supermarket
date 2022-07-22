import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserManagementService } from '../services/user-management.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private userManagementService: UserManagementService, private _router: Router) {}

  canActivate(): boolean {
    if (this.userManagementService.userData) return true;
    
    this._router.navigateByUrl('/');
    return false;
  }

  
}
