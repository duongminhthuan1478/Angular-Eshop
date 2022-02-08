import { MessageService } from 'primeng/api';
import { OrdersService, Order } from '@thuan-fe-apps-workspace/orders';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ORDER_STATUS } from '../order.constant';

@Component({
  selector: 'admin-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orderId: string;
  order: Order; 
  orderStatuses: any[];
  orderStatusSelected: string;

  constructor(
    private route: ActivatedRoute,
    private _orders: OrdersService,
    private _message: MessageService
  ) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params?.id;
    this.getOrderyById();
    this.getListOrderStatus();
  }

  public onStatusChange(event) {
    this._orders.updateOrderStatus({status: event.value}, this.orderId).subscribe({
      next: (res) =>  {
        if(!res.success) {
          this._message.add({severity:'error', summary:'Failed', detail: res.message});
        } else {
          this._message.add({severity:'success', summary:'Success', detail: res.message});
        }
      },
      error: (err) => {
        this._message.add({severity:'error', summary:'Error', detail: err.message});
      }
    });
  }

  private getOrderyById() {
    this._orders.getOrderyById(this.orderId).subscribe(res => {
      if(res.success) {
        this.order = res.data
        this.orderStatusSelected = res.data.status;
      };
    });
  }

  private getListOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map(key => {
      return { id: key, label: key }
    });
  }
}
