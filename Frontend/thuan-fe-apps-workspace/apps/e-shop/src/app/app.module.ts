import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

// Libs module
import { UiModule } from '@thuan-fe-apps-workspace/ui'; /** using short imports declare at paths in tsconfig.base.json file */
import { ProductsModule } from '@thuan-fe-apps-workspace/products';

import {AccordionModule} from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';

const route: Routes = [
  { path: '', component: HomePageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ProductsModule,
    UiModule, 
    HttpClientModule,
    RouterModule.forRoot(route),
    AccordionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
