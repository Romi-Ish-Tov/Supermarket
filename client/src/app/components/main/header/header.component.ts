import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AdminService } from 'src/app/services/admin.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserManagementService } from 'src/app/services/user-management.service';
import { Category } from 'src/models/Category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public productService: ProductsService,
    public userManagementService: UserManagementService,
    public adminService: AdminService
  ) { }

  public categoryFilter: Category;
  private decoded: any = jwtDecode(this.userManagementService.userData.token);
  public role: string = this.decoded.role;
  public query: string = '';

  ngOnInit(): void {
  }

  public toggleCart = () => {
    const cart = document.getElementById("cartBody");
    cart.classList.contains('active') ? cart.classList.remove('active') : cart.classList.add('active')
  }

  public navigateToApiDocs = () => {
    window.location.href = 'http://localhost:3001/api/docs/'
  }

}
