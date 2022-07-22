import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userManagementService: UserManagementService) { }

  public loginPayload: any = {
    userId: '',
    password: ''
  }

  public isRemember = false;  
  
  public handleLoginRequest = () => {
    let errorMessage = this.validateLoginPayload();
    errorMessage.length ?
    alert(errorMessage) :
    this.userManagementService.initLogin(this.loginPayload, this.isRemember);
    
  }
  
  private validateLoginPayload = () => {
    let errorMessage:string = "";
    this.loginPayload.userId.length != 9 ?
    errorMessage += 'please enter a valid id number \n': '';
    this.loginPayload.password.length < 6 ?
    errorMessage += 'please enter a valid password': '';
    return errorMessage;
  
  }

  ngOnInit(): void {
  }

}
