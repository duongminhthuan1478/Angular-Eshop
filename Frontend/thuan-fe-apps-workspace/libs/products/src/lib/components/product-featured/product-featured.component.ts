import { Subject, takeUntil } from 'rxjs';
import { Product } from './../../models/product.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-featured',
  templateUrl: './product-featured.component.html'
})
export class ProductFeaturedComponent implements OnInit, OnDestroy {

  destroySubscription$: Subject<any> = new Subject<any>();

  featuredProducts: Product[] = [];
  constructor(private _products: ProductsService) { }

  ngOnInit(): void {
    this.getFeaturedProducts();
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(null);
    this.destroySubscription$.complete();
  }

  private getFeaturedProducts() {
    const getNumber: number = 4;
    this._products.getFeaturedProducts(getNumber).pipe(takeUntil(this.destroySubscription$)).subscribe(res => {
      if(res.success) this.featuredProducts = res.data;
    });
  } 
  

}
