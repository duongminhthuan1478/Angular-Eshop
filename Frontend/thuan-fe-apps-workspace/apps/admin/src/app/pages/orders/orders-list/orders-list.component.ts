import { takeUntil, Subject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@thuan-fe-apps-workspace/orders';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, OnDestroy {
  destroySubscription$: Subject<any> = new Subject<any>();
  orders: Order[] = []
  orderStatus = ORDER_STATUS;

  constructor(
    private _confirmation: ConfirmationService,
    private _message: MessageService,
    private _orders: OrdersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(null);
    this.destroySubscription$.complete();
  }

  showOrder(orderId) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  handleDelete(orderId) {
    this._confirmation.confirm({
      message: 'Do you want to delete this order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
         this.deleteOrder(orderId);
      }
    });
  }

  private getOrders() {
    this._orders.getOrders().pipe(takeUntil(this.destroySubscription$)).subscribe((res) => {
      if (res.success) {
        this.orders = res.data;
      }
    });
  }

  private deleteOrder(orderId: string) {
    this._orders.deleteOrder(orderId).pipe(takeUntil(this.destroySubscription$)).subscribe({
      next: (res) => { 
        const success = res.success ? 'Success' : 'Error';
        this._message.add({severity: success.toLowerCase(), summary: success, detail: res.message});
        this.getOrders();
      },
      error: (err) => { this._message.add({severity:'error', summary:'Error', detail: err.message});}
    });
  }
}
