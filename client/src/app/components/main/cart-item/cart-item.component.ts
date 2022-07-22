import { Component, Input, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/models/Product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  constructor(private productsService: ProductsService, public cartService: CartsService) { }

  @Input()
  public currentItem: any;
  public isQuantityUpdated: boolean = false;
  public productData: Product = {
    productName: '',
    productPrice: 0,
    categoryId: '',
    _id: ''
  }
  public originalAmount: number;

  ngOnInit(): void {
    this.productData = this.productsService.productsArray.find((product: Product) =>
      (product._id == this.currentItem.productId) ? product : null);

    this.originalAmount = this.currentItem.quantity;
  }

  public updateQuantity = (clear?: string) => {
    clear ?
      this.cartService.addItemToCart({ quantity: 0, productId: this.currentItem.productId }) :
      this.cartService.addItemToCart({ quantity: this.currentItem.quantity, productId: this.currentItem.productId });
  }

  onClickIncrement = () => {

    this.currentItem.quantity++;

    (this.originalAmount == this.currentItem.quantity) ?
      this.isQuantityUpdated = false : this.isQuantityUpdated = true

  }

  onClickDecrement = () => {

    this.currentItem.quantity == 0 ? null : this.currentItem.quantity--;

    (this.originalAmount == this.currentItem.quantity) ?
      this.isQuantityUpdated = false : this.isQuantityUpdated = true

  }

}
