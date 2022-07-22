import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPayload } from 'src/models/LoginPayload';
import { RegisterPayload } from 'src/models/RegisterPayload';
import { User } from 'src/models/User';
import { decodeToken } from "../../utils/jwt-utils";
import { CartsService } from './carts.service';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private cartService: CartsService,
    private productsService: ProductsService
  ) { }

  public userData: User | null = null
  public isLoginRendered: boolean = true
  public btnText: string = 'Register';
  public isLoginModal: boolean = false;
  public registerPhase: boolean = false;

  public initRegister = (payload: RegisterPayload) => {
    this._http.post('http://localhost:3001/api/users', payload)
      .subscribe((response: string) => {
        this.toggleComponents();
        alert("user created succsessfully please log in");
      }, error => {
        let errorMessage: string = '';
        Object.values(error.error).map((errorMsg: any) => {
          errorMsg != null ? errorMessage += errorMsg + '\n' : null;
        })
        alert(errorMessage)
      })
  }


  public initLogin = (payload: LoginPayload, isRemember?: boolean) => {
    const observable = this._http.post('http://localhost:3001/api/users/login', payload);
    observable.subscribe((response: User) => {
      this.userData = response;
      isRemember ? localStorage.setItem('token', response.token) : null;
      this.productsService.initProducts();
      this.cartService.initCart();
      this.isLoginModal = true;
      this.navigateByUserType(response.token);
    }, error => alert(error.error));
  }

  public isIdUnique = (id: string): any => {
    const observable = this._http.get('http://localhost:3001/api/users/' + id);
    observable.subscribe((response: boolean) => {
      response ? null : alert("please provide a unique id");
      this.registerPhase = response;
    }, error => {
      alert(error.error)
      return false;
    });

  }

  public logout = () => {
    this.userData = null;
    localStorage.clear();
    this.cartService.cartData = [];
    this.navigateByUserType();
  }

  public loginWithToken = (token: {}) => {
    const observable = this._http.post('http://localhost:3001/api/users/loginWithToken', token);
    observable.subscribe((response: User) => {
      this.userData = response;
      this.productsService.initProducts();
      this.cartService.initCart();
      this.isLoginModal = true;
      this.navigateByUserType(response.token);
    }), error => {
      console.log(error.message);
      alert(error.message);
    }
  }

  public toggleComponents = () => {
    const elements = document.getElementsByClassName('header-btn')
    this.isLoginRendered = !this.isLoginRendered
    this.isLoginRendered ? this.btnText = 'Register' : this.btnText = 'Login';

    if (elements[0].classList.contains('active')) {
      elements[0].classList.remove('active')
      elements[1].classList.add('active')
      return;
    }

    elements[0].classList.add('active')
    elements[1].classList.remove('active');

  }

  public navigateByUserType = (token?: string) => {
    if (!token) {
      this._router.navigateByUrl('/');
      return;
    }

    const decoded: any = decodeToken(token);
    (decoded.role == 'admin') ?
      this._router.navigateByUrl('/admin') :
      this._router.navigateByUrl('/main');
  }
}
