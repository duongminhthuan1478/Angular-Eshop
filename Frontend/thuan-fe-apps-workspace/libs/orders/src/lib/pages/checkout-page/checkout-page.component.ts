import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
import { ORDER_STATUS } from '../../constants/order.constant';
import { OrderItem } from '../../models/order-item.model';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { UsersService } from './../../../../../users/src/lib/services/users.service';
import { Cart } from './../../models/cart.model';
import { Order } from './../../models/order.model';

@Component({
  selector: 'order-checkout-page',
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {
  destroySubscription$: Subject<any> = new Subject<any>();
  countries: any[] = [];

  orderItems: OrderItem[];
  form: FormGroup;
  isSubmit = false;
  userId: string;

  constructor(
    private fb: FormBuilder,
    private _users: UsersService,
    private _cart: CartService,
    private _orders: OrdersService,
    private router: Router,
    private _message: MessageService,
  ) {
    this.getCountries();
  }

  get checkoutFormControl() { return this.form.controls; }

  ngOnInit(): void {
    this.initForm();
    this.autoFillUserData();
    this.getCartItems();
  }

  placeOrder(){
    this.isSubmit = true;
    if(this.form.invalid) { return; }
    if(this.orderItems.length === 0) {
      this._message.add({severity:'error', summary:'0 Sản phẩm', detail: 'Vui lòng thêm sản phẩm vào giỏ hàng!'});
      return;
    }
    
    // Thank you page will get order from cache and create order after payment
    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutFormControl['street'].value,
      shippingAddress2: this.checkoutFormControl['apartment'].value,
      city: this.checkoutFormControl['city'].value,
      zip: this.checkoutFormControl['zip'].value,
      country: this.checkoutFormControl['country'].value,
      phone: this.checkoutFormControl['phone'].value,
      status: ORDER_STATUS.Pending.label,
      user: this.userId,
      dateOrdered: new Date().toString()
    }
    localStorage.setItem('orderData', JSON.stringify(order));

    this._orders.createCheckoutSession(this.orderItems).subscribe(error => {
      if(error) {
       console.log('createCheckoutSession-error', error);
      }
   })
  }

  private getCountries() {
    this.countries = this._users.getCountries();
  }

  private initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      apartment: [''],
      zip: [''],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
  }
  
  private getCartItems() {
    const cart: Cart = this._cart.getCartFromLS();
    this.orderItems = cart.items.map(item => {
      return {
        product: item.productId,
        quantity: item.quantity
      }
    });
  }

  private autoFillUserData() {
    this._users.observeCurrentUser().pipe(takeUntil(this.destroySubscription$)).subscribe(user => {
      this.userId = user?.id;
      this.form.patchValue(user);
    })
  }
}
