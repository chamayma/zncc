import {
  ENVIRONMENT_INITIALIZER,
  NgModule,
  importProvidersFrom,
  inject,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthsComponent } from './pages/auths/auths.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AsideComponent } from './pages/layout/aside/aside.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { FooterComponent } from './pages/layout/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { QueryClient, hydrate } from '@tanstack/query-core';
import { provideQueryClient, provideQueryClientOptions } from '@ngneat/query';
import { SalesChartComponent } from './pages/components/admin/sales-chart/sales-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DataTablesModule } from 'angular-datatables';
import { FormComponent } from './pages/components/form/form.component';
import { DashboardComponent } from './pages/components/dashboard/dashboard.component';
import { HomeComponent } from './pages/components/home/home.component';
import { PaymentComponent } from './pages/components/payment/payment.component';
import { AdminComponent } from './pages/components/admin/admin.component';

const queryClient = new QueryClient();
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FormComponent,
    AuthsComponent,
    LayoutComponent,
    AsideComponent,
    HeaderComponent,
    FooterComponent,
    SalesChartComponent,
    HomeComponent,
    PaymentComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatDialogModule,
    CommonModule,
    MatProgressBarModule,
    BrowserModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    DataTablesModule,
  ],
  providers: [
    provideQueryClientOptions({
      defaultOptions: {
        queries: {
          staleTime: 3000,
          networkMode: 'offlineFirst',
        },
      },
    }),
    // DefaultOptionsService.configureQueryClientOptions(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
