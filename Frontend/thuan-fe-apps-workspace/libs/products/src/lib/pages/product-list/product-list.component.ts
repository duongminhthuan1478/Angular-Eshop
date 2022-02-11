import { ActivatedRoute } from '@angular/router';
import { Category } from './../../models/category.model';
import { Subject, takeUntil } from 'rxjs';
import { Product } from './../../models/product.model';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from './../../services/categories.service';

@Component({
  selector: 'products-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy {
  destroySubscription$: Subject<any> = new Subject<any>();

  products: Product[] = [];
  categories: Category[] = [];
  categoryId: string;
  
  constructor(
    private _products: ProductsService,
    private _categories: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.queryParams?.id;
    !!this.categoryId ? this.getProducts([this.categoryId]) : this.getProducts();
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(null);
    this.destroySubscription$.complete();
  }

  categoryFilter() {
    const selectedCategories: any = this.categories.filter((cat) => cat.checked === true).map((object) => object.id);
    this.getProducts(selectedCategories);
  }

  private getProducts(categoriesFilter?: string[]) {
    this._products.getProducts(categoriesFilter).pipe(takeUntil(this.destroySubscription$)).subscribe((res) => {
      if (res.success) {
        this.products = res.data;
      }
    });
  }

  private getCategories() {
    this._categories.getCategories().pipe(takeUntil(this.destroySubscription$)).subscribe((res) => {
      if (res.success) {
        this.categories = res.data;
        // Handle checked category from category banner at HomePage
        if(this.categoryId) {
          const catFilter: any  = this.categories.find(cat => cat.id === this.categoryId);
          catFilter.checked = true;
          
        }
      }
    });
  }
}
