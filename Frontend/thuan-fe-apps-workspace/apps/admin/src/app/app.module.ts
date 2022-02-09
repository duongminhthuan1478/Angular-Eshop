import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoryComponent } from './pages/categories/category/category.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductComponent } from './pages/products/product/product.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UserComponent } from './pages/users/user/user.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrderDetailComponent } from './pages/orders/order-detail/order-detail.component';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule}  from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FieldsetModule } from 'primeng/fieldset';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { AuthGuard, JwtInterceptor, UsersModule } from '@thuan-fe-apps-workspace/users';

const UX_MODULE = [
  CardModule,
  ToolbarModule,
  TableModule,
  ButtonModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule,
  TagModule,
  InputMaskModule,
  SelectButtonModule,
  FieldsetModule
];

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
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
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoryComponent,
    ProductsListComponent,
    ProductComponent,
    UsersListComponent,
    UserComponent,
    OrdersListComponent,
    OrderDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    ...UX_MODULE,
    UsersModule
  ],
  providers: [
    MessageService, 
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
