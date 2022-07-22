import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { PaymentModalService } from 'src/app/services/payment-modal.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css']
})
export class ModalContentComponent implements OnInit {

  public input: string = '';

  public city: string = '';
  public street: string = '';
  public houseNumber: string = '';
  public shippingDate: Date;
  public contactInfo: string = '';
  public oldCartId: string = '';
  public currentDate: any;
  public currentMonth: any;

  public creditCardNumber: string = '';
  public expirationDate: string;
  public cvv: string = '';

  constructor(
    public cartService: CartsService,
    public productsService: ProductsService,
    public paymentModalService: PaymentModalService,
    public userManagementService: UserManagementService
  ) { }

  public highlightSearch = () => {
    for (let index = 0; index < this.cartService.items.length; index++) {
      const item: any = document.getElementById(this.cartService.items[index]._id);

      (item.children[0].children[1].innerHTML.toLowerCase().includes(this.input.toLowerCase())) ?
        item.classList.add("highlight") :
        item.classList.remove("highlight");

      if (this.input == '') {
        item.classList.remove("highlight");
      }
    }
  }

  public autoFillData = (key: string) => {
    switch (key) {
      case 'city': this.city = this.userManagementService.userData[key]
        break;
      case 'street': this.street = this.userManagementService.userData[key]
        break;
      case 'houseNumber': this.houseNumber = this.userManagementService.userData[key]
        break;
    }
  }

  public continuePayment = () => {
    this.cartService.modalStage++;
  };

  public finishPayment = async () => {
    const orderDetails = {
      city: this.city,
      street: this.street,
      houseNumber: this.houseNumber,
      shippingDate: this.shippingDate,
      contactInfo: this.contactInfo,
      last4Digits: this.creditCardNumber.slice(-4)
    }
    if (!this.validateInput(orderDetails)) {
      return alert("invalid shipping details");
    }

    const creditCardDetails = {
      creditCardNumber: this.creditCardNumber,
      expirationDate: this.expirationDate,
      cvv: this.cvv,
    }

    if (!this.validateCreditCard(creditCardDetails)) {
      return alert("invalid credit card details");
    }

    this.cartService.closeCart(orderDetails);
  }

  public validateInput = (input: object): boolean => {

    let inputArray = Object.values(input);

    for (let input of inputArray) {
      if (input.length < 2) return false;
    }

    const isPastDate = this.validateDate(this.shippingDate, this.currentDate);
    if (!isPastDate) return false;

    return true;
  }

  public validateCreditCard = (creditCardDetails: any): boolean => {
    if (creditCardDetails.creditCardNumber.length < 8) return false;
    if (creditCardDetails.cvv.length != 3) return false;
    if (!creditCardDetails.expirationDate) return false;

    const isExpDate = this.validateDate(creditCardDetails.expirationDate, this.currentMonth)
    if(!isExpDate) return false;

    return true
  }

  private validateDate = (expDate: any, currentDate: any) => {    
    if(JSON.parse(expDate.replaceAll('-', '')) < JSON.parse(currentDate.replaceAll('-', ''))) {
      return false;
    } 
    return true;
  }

  public goBack = () => this.cartService.modalStage--;

  public formatDate = () => {
    let today: any = new Date();
    let yyyy = today.getFullYear();
    let mm: any = today.getMonth() + 1; // Months start at 0!
    let dd: any = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }



  ngOnInit(): void {
    this.currentDate = this.formatDate();
    this.currentMonth = this.formatDate().substring(0, 7);

    this.city = '';
    this.street = '';
    this.houseNumber = '';
    this.shippingDate = this.currentDate;
    this.contactInfo = '';

    this.oldCartId = this.cartService.cartData._id
  }
}
