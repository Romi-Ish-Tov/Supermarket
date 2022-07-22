import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/models/Category';
import { Product } from 'src/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }
  public productsArrayFiltered: any = [];
  public productsArray: any = [];
  public categories: Category[] = [];
  public query: string = '';
  public storeStats: any = {
    currentAmountOfOrders: 0,
    currentAmountOfProducts: 0
  }

  public initProducts = () => {
    const observable = this._http.get('http://localhost:3001/api/products');
    observable.subscribe((response: any) => { 
      this.setProductsArray(response.products);
      this.categories = response.categories;
    }), error => {
      console.log("here");
      alert(error);
    }
  }

  public initStoreStats = () => {
    const observable = this._http.get('http://localhost:3001/api/products/stats');
    observable.subscribe((response: any) => {
      this.storeStats = response;
    }, error => {
      console.log(error);
      alert(error.msg)
    })
  }

  public sort = (event: any) => {
    (event.target.value == "Show All") ? this.initProducts() : this.sortByCategory(event.target.value);
    this.query = '';
  }

  public sortByCategory = (id) => {
    const observable = this._http.get(`http://localhost:3001/api/products/${id}`);
      observable.subscribe((response: any) => {
        this.setProductsArray(response);
      }), error => {
      console.log(error.message);
      alert(error.message);
    }
  }

  setProductsArray = (products: Product[]) => {
    this.productsArrayFiltered = products;
    this.productsArray = products
  }

  public sortBySearch = () => {
    if (this.query == "") return this.productsArrayFiltered = this.productsArray;
    const filteredArray = this.productsArray.filter((product: Product) => product.productName.toLowerCase().includes(this.query.toLowerCase()))
    this.productsArrayFiltered = filteredArray;
  }
}
