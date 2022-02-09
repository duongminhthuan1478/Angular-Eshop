import { OrderDetailComponent } from './pages/orders/order-detail/order-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../../../libs/users/src/lib/guards/auth.guard';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoryComponent } from './pages/categories/category/category.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { ProductComponent } from './pages/products/product/product.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { UserComponent } from './pages/users/user/user.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { ShellComponent } from './shared/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'categories', component: CategoriesListComponent },
      { path: 'categories/form', component: CategoryComponent },
      { path: 'categories/form/:id', component: CategoryComponent },
      { path: 'products', component: ProductsListComponent },
      { path: 'products/form', component: ProductComponent },
      { path: 'products/form/:id', component: ProductComponent },
      { path: 'users', component: UsersListComponent },
      { path: 'users/form', component: UserComponent },
      { path: 'users/form/:id', component: UserComponent },
      { path: 'orders', component: OrdersListComponent },
      { path: 'orders/:id', component: OrderDetailComponent },
    ],
  },
  { pathMatch: 'full', path: '**', redirectTo: '' }
];
@NgModule({
    imports: [  
        RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    ],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})

export class AppRoutingModule { }
