import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@thuan-fe-apps-workspace/orders';
import { ProductsService } from '@thuan-fe-apps-workspace/products';
import { UsersService } from '@thuan-fe-apps-workspace/users';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalUsers = 0;
  totalProducts = 0;
  totalOrders = 0;
  totalSales = 0;

  constructor(
    private _users: UsersService,
    private _products: ProductsService,
    private _orders: OrdersService
  ) { }

  ngOnInit(): void {
    Promise.all([
      this._users.getUserCount(),
      this._products.getProductCount(),
      this._orders.getOrderCount(),
      this._orders.getTotalSale()
    ]).then(res => {
      this.totalUsers = res[0].count;
      this.totalProducts = res[1].count;
      this.totalOrders = res[2].count;
      this.totalSales = res[3].totalSales;
    })
  }

}
