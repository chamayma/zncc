import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthsComponent } from './pages/auths/auths.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { FormComponent } from './pages/components/form/form.component';
import { DashboardComponent } from './pages/components/dashboard/dashboard.component';
import { HomeComponent } from './pages/components/home/home.component';
import { PaymentComponent } from './pages/components/payment/payment.component';
import { AdminComponent } from './pages/components/admin/admin.component';

const routes: Routes = [

  {
    path: '', component: AuthsComponent
  },
  {
    path: 'admin', component: AdminComponent 
  },
  {
    path: 'layout', component: LayoutComponent 
  },
  {
    path: 'dashboard', component: DashboardComponent
    ,
    children: [
      {
        path: '', component: HomeComponent
      }
      ,
      {
        path: 'home', component: HomeComponent
      }
      , {
        path: 'form', component: FormComponent
      }
      , 
      {
        path: 'payment', component: PaymentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
