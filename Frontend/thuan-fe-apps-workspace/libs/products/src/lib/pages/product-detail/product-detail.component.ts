import { Product } from './../../models/product.model';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  destroySubscription$: Subject<any> = new Subject<any>();
  quantity: number;
  productId: string;
  product: Product;

  constructor(
    private _products: ProductsService,
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
    
  }

  private getProductById(productId: string) {
    this._products.getProductById(this.productId).pipe(takeUntil(this.destroySubscription$)).subscribe(res => {
      if(res?.data) {
        this.product = res.data;
      } 
    });
  }
  
}
