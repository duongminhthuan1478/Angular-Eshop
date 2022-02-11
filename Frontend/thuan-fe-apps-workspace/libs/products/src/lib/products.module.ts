import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductFeaturedComponent } from './components/product-featured/product-featured.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';

import { OrdersModule } from '@thuan-fe-apps-workspace/orders';
import { UiModule } from '@thuan-fe-apps-workspace/ui';


const routes: Routes = [
  { path: 'product', component: ProductListComponent},
  { path: 'products', component: ProductListComponent },
  { path: 'products/:productId', component: ProductDetailComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UiModule,
    OrdersModule,
    FormsModule,
    RouterModule.forChild(routes),
    ButtonModule,
    CheckboxModule,
    RatingModule,
    InputNumberModule
  ],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    ProductFeaturedComponent,
    ProductListComponent,
    ProductDetailComponent
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductFeaturedComponent,
    ProductItemComponent,
    ProductListComponent
  ]
})
export class ProductsModule {}
