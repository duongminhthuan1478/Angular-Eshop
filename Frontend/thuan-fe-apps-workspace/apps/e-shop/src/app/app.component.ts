import { Component, OnInit } from '@angular/core';
import { CartService } from '@thuan-fe-apps-workspace/orders';
import { UsersService } from '@thuan-fe-apps-workspace/users';

@Component({
  selector: 'eshop-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'e-shop';

  constructor(
    private _cart: CartService,
    private _users: UsersService
  ) {
   // This module is called from e-shop main application, I will init orders cart state & save to localstorage for users who enter to my app.
   _cart.initLocalStorage();
  }

  ngOnInit(): void {
    this._users.initAppSession();
  }
}
