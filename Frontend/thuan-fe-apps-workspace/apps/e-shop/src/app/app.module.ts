import { ToastModule } from 'primeng/toast';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Libs module
import { UiModule } from '@thuan-fe-apps-workspace/ui'; /** using short imports declare at paths in tsconfig.base.json file */
import { ProductsModule } from '@thuan-fe-apps-workspace/products';
import { OrdersModule } from '@thuan-fe-apps-workspace/orders';
import { JwtInterceptor } from '@thuan-fe-apps-workspace/users';

import { AccordionModule } from 'primeng/accordion';

const route: Routes = [
  { path: '', component: HomePageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ProductsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    UiModule,
    OrdersModule,
    HttpClientModule,
    RouterModule.forRoot(route),
    AccordionModule,
    ToastModule,
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
