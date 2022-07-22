import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/services/user-management.service';
import { RegisterPayload } from 'src/models/RegisterPayload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public userManagementService: UserManagementService) { }

  public confirmPassword: string = '';

  public registerPayload: RegisterPayload = {
    userId: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    city: '',
    street: '',
    houseNumber: '',
  };

  public handleBackClick = () => this.userManagementService.registerPhase = false;

  public handleRegisterRequest = () => {
    this.userManagementService.initRegister(this.registerPayload)
    this.registerPayload = {
      userId: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      city: '',
      street: '',
      houseNumber: '',
    };

  }

  public validateFirstPhaseInput = async () => {

    let errorMessage: string = "";

    this.registerPayload.userId.length != 9 ?
      errorMessage += "please enter a valid id number \n" : ''

    this.registerPayload.password.length < 6 ?
      errorMessage += 'password length must be at least 6 characters \n' : '';

    this.registerPayload.password != this.confirmPassword ?
      errorMessage += 'passwords must match \n' : '';

    if (!this.registerPayload.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      errorMessage += 'Please provide a valid email \n';
    }

    if (errorMessage.length) return alert(errorMessage);

    this.userManagementService.isIdUnique(this.registerPayload.userId);

    if (!this.userManagementService.registerPhase) {

    }
  }

  public validateSecondPhaseInput = () => {
    let errorMessage: string = "";



    this.registerPayload.firstName.length < 2 ? errorMessage += "please enter a first name \n" : "";
    this.registerPayload.lastName.length < 2 ? errorMessage += "please enter a last name \n" : "";
    this.registerPayload.city.length < 2 ? errorMessage += "please enter a city name \n" : "";
    this.registerPayload.street.length < 2 ? errorMessage += "please enter a street name \n" : "";
    this.registerPayload.houseNumber.length < 1 ? errorMessage += "please enter your house number \n" : "";

    if (errorMessage.length) return alert(errorMessage);

    this.handleRegisterRequest();
  }

  ngOnInit(): void { }
}
