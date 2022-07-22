import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']

})
export class LandingComponent implements OnInit {

  constructor(public userManagementService: UserManagementService, private productsService: ProductsService) { }

  ngOnInit(): void {
    const isToken: boolean = !!localStorage.getItem('token');
    isToken ? this.userManagementService.loginWithToken({token: localStorage.getItem('token')}) : null;
    this.productsService.initStoreStats();
  }

}
