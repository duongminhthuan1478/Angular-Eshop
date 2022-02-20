import { MessageService } from 'primeng/api';
import { CartService, OrdersService } from '@thuan-fe-apps-workspace/orders';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'order-thank-you',
  templateUrl: './thank-you.component.html'
})
export class ThankYouComponent implements OnInit {

  constructor( 
    private _cart: CartService,
    private _orders: OrdersService,
    private _message: MessageService) {
   }

  ngOnInit(): void {
    const orderData = JSON.parse(localStorage.getItem('orderData') as string);
    console.log('orderData', orderData)
    if(!orderData || orderData?.length === 0) return;
     this._orders.createOrder(orderData).subscribe(res => {
      if(res.success) {
        this._cart.clearCart();
        localStorage.removeItem('orderData');
        this._message.add({severity:'info', summary:'Đặt hàng', detail: "Đơn hàng đã đặt thành công"});
      }
    }, (err) => {
      this._message.add({severity:'error', summary:'Có lỗi xảy ra, thử lại sau', detail: err.statusText});
    });
  }

}
