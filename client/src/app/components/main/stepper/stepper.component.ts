import { Component, Input, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { Product } from 'src/models/Product';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  constructor(public cartService: CartsService) { }

  @Input()
  public productId: string;

  public quantity: number = 0
  ngOnInit(): void {}

  onClickIncrement = () => this.quantity++;
  onClickDecrement = () => this.quantity == 0 ? null : this.quantity--

  public onCartClicked = () => {
    if (!this.quantity) return;
    this.cartService.addItemToCart({ productId: this.productId, quantity: this.quantity })
    this.quantity = 0;
  }
}
