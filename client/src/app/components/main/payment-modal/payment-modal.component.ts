import { Component, OnInit } from '@angular/core';
import { PaymentModalService } from 'src/app/services/payment-modal.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {

  constructor(public paymentModalService: PaymentModalService) { }

  ngOnInit(): void {
  }

}
