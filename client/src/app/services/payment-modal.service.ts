import { Injectable } from '@angular/core';
import { CartsService } from './carts.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentModalService {
  constructor(private cartService: CartsService) { }
  
  public isPaymentModal: boolean= false;
  
  public setPaymentModal = (status: boolean) => {
    this.cartService.modalStage = 0
    this.isPaymentModal = status;
}
  
}
