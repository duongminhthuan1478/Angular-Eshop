import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { CartItemDetail } from '../../models/cart.model';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItemDetails: CartItemDetail[] = [];
  destroySubscription$: Subject<any> = new Subject<any>();
  cartCount: number = 0;

  constructor(
    private router: Router,
    private _cart: CartService,
    private _orders: OrdersService
  ) {}

  ngOnInit(): void {
    this.getCartDetail();
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(null);
    this.destroySubscription$.complete();
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  updateCartItemQuantity(event: any, cartItem: CartItemDetail) {
    this._cart.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    }, true)
  }

  backToShop() {
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartItem: CartItemDetail) {
    this._cart.deleteCartItem(cartItem.product.id);
  }

  private getCartDetail() {
    this._cart.cart$.pipe(takeUntil(this.destroySubscription$)).subscribe({
      next: (res) => {
        this.cartItemDetails = [];
        this.cartCount = res?.items.length ?? 0;
        res.items.forEach((item) => {
          this._orders.getProductById(item.productId).subscribe((product) => {
            this.cartItemDetails.push({ product: product.data, quantity: item.quantity });
          });
        });
      }
    });
  }
}
