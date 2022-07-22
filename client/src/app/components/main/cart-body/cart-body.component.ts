import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { Product } from 'src/models/Product';

@Component({
  selector: 'app-cart-body',
  templateUrl: './cart-body.component.html',
  styleUrls: ['./cart-body.component.css']
})
export class CartBodyComponent implements OnInit {

  constructor(public cartService: CartsService) { }

  ngOnInit(): void {
    this.cartService.initCart()
  }


}
