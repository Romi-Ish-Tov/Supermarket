import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { LandingComponent } from './pages/landing/landing.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'main', component: MainComponent, canActivate: [LoginGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
