import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from './../../models/product.model';
import { Component, Input, OnInit } from '@angular/core';
import { CartService, CartItem } from '@thuan-fe-apps-workspace/orders';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;

  constructor(private _cart: CartService, private _message: MessageService) {}

  ngOnInit(): void {}

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product?.id as string,
      quantity: 1,
    };
    this._cart.setCartItem(cartItem);
    this._message.add({severity: 'info', summary: 'Đã thêm vào giỏ hàng', detail: this.product.name});
  }
}
