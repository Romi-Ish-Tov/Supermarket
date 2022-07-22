import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/models/Product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient, public productService: ProductsService) { }

  public isSidebarOpen: boolean = false;
  public product: Product | null = null;

  public toggleSidebar = (state: boolean, item?: Product) => {
    item ? this.product = item : this.product = null;

    return this.isSidebarOpen = state;
  }
  public handleAdminAction = (payload: any) => {
    const observable = this._http.post('http://localhost:3001/api/products', payload);

    observable.subscribe((response: any) => {
      this.productService.setProductsArray(response);
    },
      error => {
        let errorMessage: string = '';
        Object.values(error.error).map((errorMsg: string | null) => {
          errorMsg ? errorMessage += `${errorMsg} \n` : null
        })
        alert(errorMessage);
      }
    )
  }
}
