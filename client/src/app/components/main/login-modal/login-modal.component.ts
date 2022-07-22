import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  
  constructor(public userManagementService: UserManagementService, public cartService: CartsService) { }
  
  ngOnInit(): void {
    
  }

}
