import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ProductsService } from 'src/app/services/products.service';
import { Category } from 'src/models/Category';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  constructor(public productService: ProductsService, public adminService: AdminService) { }

  public productName: string = '';
  public productPrice: number;
  public categoryId: string;

  public categoryArray: Category[] = [...this.productService.categories];
  public idiotArray: string[] = []

  public selectedCategory: string = this.idiotArray[0];
  public initialCategory: string = this.idiotArray[0];

  public yoavHasASmallBrain = () => {
    this.categoryArray.map((item: Category, index: number) => {
      if (this.categoryArray[index]._id != this.categoryId) {
        return this.idiotArray.push(item.categoryName)
      }

      this.initialCategory = item.categoryName
      return this.selectedCategory = item.categoryName
    });
  }

  public handleSubmit = () => {
    
    const categoryId = this.extractId(this.selectedCategory)
    const productId = this.extractProductId()
    const payload = {
      productName: this.productName,
      productPrice: this.productPrice,
      categoryId: categoryId,
      productId: productId
    }

    this.adminService.handleAdminAction(payload);
    this.adminService.toggleSidebar(false)
  }

  private extractProductId = () => this.adminService.product? this.adminService.product._id : undefined
  

  public extractId = (categoryName: string) => {
    let categoryId: string = ''
    this.categoryArray.map((category: Category) => {
      if (category.categoryName == categoryName) {
        categoryId = category._id
      }
    })
    return categoryId;

  }

  private initProduct = () => {
    if (this.adminService.product) {
      this.productName = this.adminService.product.productName;
      this.productPrice = this.adminService.product.productPrice;
      this.categoryId = this.adminService.product.categoryId;

    }
  }

  getNewCategoryValue = (event: any) => this.selectedCategory = (event.target.value);
  
  ngOnInit(): void {
    this.initProduct();
    this.yoavHasASmallBrain();
  }

}
