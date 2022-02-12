import { CartService } from '@thuan-fe-apps-workspace/orders';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html'
})
export class CartIconComponent implements OnInit {
  
  cartCount: number = 0;

  constructor(private _cart: CartService) {}

  ngOnInit(): void {
    this._cart.cart$.subscribe(res => {
      this.cartCount = res?.items?.length;
    })
  }
}
