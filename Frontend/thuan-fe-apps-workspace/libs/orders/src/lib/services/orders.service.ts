import { Observable, lastValueFrom } from 'rxjs';
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

  /**
   * roductService(ProductsModule) using OrderService(OrdersModule), OrderService using ProductService 
   * => circular dependency, angular doesn't implement => maximum call stack
   * Temp solution to avoid thís
   */
  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}products/getProductById/${productId}`);
  }

  async getOrderCount(): Promise<any> {
    const orderCount$ = this.http.get<any>(this.API_ORDERS + '/count');
    return await lastValueFrom(orderCount$);
  }

  async getTotalSale(): Promise<any> {
    const totalSale$ = this.http.get<any>(this.API_ORDERS + '/getTotalSales');
    return await lastValueFrom(totalSale$);
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
