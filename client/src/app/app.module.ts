import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { UserManagementComponent } from './components/landing/user-management/user-management.component';
import { AboutComponent } from './components/landing/about/about.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/landing/register/register.component';
import { LoginComponent } from './components/landing/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CartComponent } from './components/main/cart/cart.component';
import { ProductsListComponent } from './components/main/products-list/products-list.component';
import { HeaderComponent } from './components/main/header/header.component';
import { CardComponent } from './components/main/card/card.component';
import { StepperComponent } from './components/main/stepper/stepper.component';
import { CartHeaderComponent } from './components/main/cart-header/cart-header.component';
import { CartBodyComponent } from './components/main/cart-body/cart-body.component';
import { CartFooterComponent } from './components/main/cart-footer/cart-footer.component';
import { CartItemComponent } from './components/main/cart-item/cart-item.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { PaymentModalComponent } from './components/main/payment-modal/payment-modal.component';
import { ModalContentComponent } from './components/main/modal-content/modal-content.component';
import { ModalItemComponent } from './components/main/modal-item/modal-item.component';
import { PreviewSliderComponent } from './components/landing/preview-slider/preview-slider.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { LoginModalComponent } from './components/main/login-modal/login-modal.component';
import { FooterComponent } from './components/landing/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UserManagementComponent,
    PreviewSliderComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    CartComponent,
    ProductsListComponent,
    HeaderComponent,
    CardComponent,
    StepperComponent,
    CartHeaderComponent,
    CartBodyComponent,
    CartFooterComponent,
    CartItemComponent,
    PaymentModalComponent,
    ModalContentComponent,
    ModalItemComponent,
    LandingComponent,
    AdminSidebarComponent,
    LoginModalComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ 
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
