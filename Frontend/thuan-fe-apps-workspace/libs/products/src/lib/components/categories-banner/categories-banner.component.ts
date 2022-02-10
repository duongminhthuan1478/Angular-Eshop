import { CategoriesService } from './../../services/categories.service';
import { Category } from './../../models/category.model';
import { takeUntil, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html'
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  destroySubscription$: Subject<any> = new Subject<any>();
  categories: Category[] = [];

  constructor(private _categories: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(null);
    this.destroySubscription$.complete();
  }

  private getCategories() {
    this._categories.getCategories().pipe(takeUntil(this.destroySubscription$)).subscribe((res) => {
      if (res.success) {
        this.categories = res.data;
      }
    });
  };

}
