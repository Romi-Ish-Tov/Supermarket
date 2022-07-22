import { Component, OnInit } from '@angular/core';
import { PaymentModalService } from 'src/app/services/payment-modal.service';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor( public paymentModalService: PaymentModalService, public userManagementService: UserManagementService) { }
  
  ngOnInit(): void {}

}
