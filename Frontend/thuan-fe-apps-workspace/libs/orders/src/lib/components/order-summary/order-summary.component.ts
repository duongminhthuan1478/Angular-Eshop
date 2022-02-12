import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
})
export class OrderSummaryComponent implements OnInit, OnDestroy {

  destroySubscription$: Subject<any> = new Subject<any>();
  totalPrice: number = 0;
  productOrders: any[] = [];
  isCheckoutRoute: boolean;

  constructor(
    private _cart: CartService, 
    private _orders: OrdersService,
    private router: Router
  ) {
    this.isCheckoutRoute = this.router.url.includes('checkout') ? true: false;
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(null);
    this.destroySubscription$.complete();
  }

  ngOnInit(): void {
    this.calTotalPrice();
  }

  navigateToCheckout() {
    this.router.navigate(['/checkout']);
  }

  private calTotalPrice() {
    this._cart.cart$.pipe(takeUntil(this.destroySubscription$)).subscribe({
      next: (res) => {
        this.productOrders = [];
        this.totalPrice = 0;
        res.items.forEach((item) => {
          this._orders
            .getProductById(item.productId)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice = this.totalPrice + (product.data.price * item.quantity);
              this.productOrders.push({
                prodname: product.data.name,
                quantity: item.quantity,
                subPrice: product.data.price
              });
            });
        });
      },
    });
  }
  
}
