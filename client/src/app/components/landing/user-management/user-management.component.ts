import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  
  constructor(public userManagementService: UserManagementService){}


  ngOnInit(): void {
  }
}
