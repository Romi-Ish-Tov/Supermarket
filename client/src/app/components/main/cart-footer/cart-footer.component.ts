import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { PaymentModalService } from 'src/app/services/payment-modal.service';
import { Product } from 'src/models/Product';

@Component({
  selector: 'app-cart-footer',
  templateUrl: './cart-footer.component.html',
  styleUrls: ['./cart-footer.component.css']
})
export class CartFooterComponent implements OnInit {

  constructor(public cartService: CartsService, public paymentModalService: PaymentModalService) { }

  ngOnInit(): void {
  }

}
