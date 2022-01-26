import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

// Libs module
import { UiModule } from '@thuan-fe-apps-workspace/ui'; /** using short imports declare at paths in tsconfig.base.json file */

const route: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'products', component: ProductListComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomePageComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    UiModule, 
    RouterModule.forRoot(route)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
