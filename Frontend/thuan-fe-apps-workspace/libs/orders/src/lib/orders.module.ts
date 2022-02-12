import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';

import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

import { AuthGuard, UsersModule } from '@thuan-fe-apps-workspace/users';

const routes: Routes = [
  { path: 'cart', component: CartPageComponent },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    component: CheckoutPageComponent,
  },
  { path: 'checkout-success', component: ThankYouComponent },
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersModule,
    RouterModule.forChild(routes),
    ButtonModule,
    BadgeModule,
    InputNumberModule,
    InputMaskModule,
    InputTextModule,
    DropdownModule,
    CardModule,
  ],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
  ],
  exports: [CartIconComponent],
})
export class OrdersModule {}
