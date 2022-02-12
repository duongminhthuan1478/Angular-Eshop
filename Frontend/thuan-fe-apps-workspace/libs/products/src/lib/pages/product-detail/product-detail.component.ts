import { MessageService } from 'primeng/api';
import { Product } from './../../models/product.model';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CartItem, CartService } from '@thuan-fe-apps-workspace/orders';

@Component({
  selector: 'products-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  destroySubscription$: Subject<any> = new Subject<any>();
  quantity: number = 1;
  productId: string;
  product: Product;

  constructor(
    private _products: ProductsService,
    private _cart: CartService,
    private _message: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params?.productId;
    this.getProductById(this.productId);
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(null);
    this.destroySubscription$.complete();
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id as string,
      quantity: this.quantity,
    };
    this._cart.setCartItem(cartItem);
    this._message.add({severity: 'info', summary: 'Đã thêm vào giỏ hàng', detail: this.product.name});
  }

  private getProductById(productId: string) {
    this._products.getProductById(this.productId).pipe(takeUntil(this.destroySubscription$)).subscribe(res => {
      if(res?.data) {
        this.product = res.data;
      } 
    });
  }
  
}
