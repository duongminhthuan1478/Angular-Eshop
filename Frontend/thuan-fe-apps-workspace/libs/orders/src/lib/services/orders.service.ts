import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@thuan-env/environment';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private API_ORDERS = environment.API_URL + 'orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any> {
    return this.http.get<any>(this.API_ORDERS);
  }

  getOrderyById(orderId: string): Observable<any> {
    return this.http.get<any>(`${this.API_ORDERS}/getOrderById/${orderId}`);
  }

  createOrder(order: Order): Observable<any> {
    return this.http.post(`${this.API_ORDERS}/create`, order);
  }

  updateOrderStatus(orderStatusObj: {status: string}, orderId: string): Observable<any> {
    return this.http.put(`${this.API_ORDERS}/update-status/${orderId}`, orderStatusObj);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.API_ORDERS}/delete/${orderId}`);
  }
}
