import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ItemPayload } from 'src/models/ItemPayload';
import { Product } from 'src/models/Product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartsService implements OnInit  {

  public cartData: any;
  public items: any = [];
  public total: number = 0;
  public previousCartData: any;
  public modalStage: number = 0;
  constructor(private _http: HttpClient, private productsService: ProductsService) { }

  public initCart = () => {
    const observable = this._http.get('http://localhost:3001/api/carts');
      observable.subscribe((response: any) => {
        this.cartData = response.currentCart.cart;
        this.items = response.currentCart.cartItems;
        this.previousCartData = response.latestCart;
        this.total = this.calculateTotal();
      }), error => {
      console.log(error.message);
      alert(error.message);
    }
  }

  public clearCart = () => {
    const observable = this._http.delete(`http://localhost:3001/api/items/${this.cartData._id}`);
      observable.subscribe((response: any) => {
        this.items = [];
        this.total = this.calculateTotal();
      }), error => {
      console.log(error.message);
      alert(error.message);
    }
  }

  public addItemToCart = (payload: any) => {
    if (payload.quantity < 0) return;

    payload.cartId = this.cartData._id;
    const observable = this._http.post('http://localhost:3001/api/items', payload);
      observable.subscribe((response: any) => {
        this.items = response;
        this.total = this.calculateTotal();
    }), error => {
      console.log(error.message);
      alert(error.message);
    }
  }

  public closeCart = (orderDetails: any) => {
    if (!this.items.length) throw new Error('Empty cart');

    const payload = { cartId: this.cartData._id, orderDetails };
    const observable = this._http.patch('http://localhost:3001/api/carts', payload);
    observable.subscribe((response: any) => {
      this.cartData = response.newCartData.cart;
      this.items = [];
      this.total = this.calculateTotal();
      this.modalStage++;
    
    }, error => {
      console.log(error.error)
      let errorMessage: string = '';
      Object.values(error.error.error).map((errorMsg: string | null) => {
        errorMsg ? errorMessage += `${errorMsg} \n` : null
      })
      alert(errorMessage);
    })
  }

  public downloadReceipt = (cartId: string) => {
    const observable = this._http.get<string>(`http://localhost:3001/api/receipts/${cartId}`);
      observable.subscribe((response: string) => {
        this.downloadFile(response)
      }, error => {
      console.log(error);
      alert(error.error.message);
      })
  }

  public calculateTotal = () => {
    const total = this.items.reduce((sum: number, item: any) => {
      let [product] = this.productsService.productsArray.filter((product: any) => {
        return (product._id == item.productId) ? product : null;
      })

      if (!product) return sum +=0;
      return sum += item.quantity * product.productPrice;
      
    }, 0)

    return total;
  }

  private downloadFile = (data: any) => {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

    
  ngOnInit(): void {
  }

}


