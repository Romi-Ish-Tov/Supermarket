import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.css']
})
export class CartHeaderComponent implements OnInit {

  public user: string
  constructor(public userManagementService: UserManagementService, public cartService: CartsService) { }

  ngOnInit(): void {
    this.user = this.userManagementService.userData.firstName
  }

}
