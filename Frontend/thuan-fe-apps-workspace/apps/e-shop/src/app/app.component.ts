import { Component } from '@angular/core';
import { CartService } from '@thuan-fe-apps-workspace/orders';

@Component({
  selector: 'eshop-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'e-shop';

  constructor(private _cart: CartService) {
   // This module is called from e-shop main application, I will init orders cart state & save to localstorage for users who enter to my app.
   _cart.initLocalStorage();
  }
}
