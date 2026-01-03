import { HttpClient } from '@angular/common/http';

import { inject, Injectable } from '@angular/core';
import { OrderResponse } from '../order/interfaces/order-response.interface';
import { OrderFormRequest } from '../order/interfaces/order-form-request.interface';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly baseUrl = `${environment.apiUrl}/orders`;
  private http = inject(HttpClient);

  getAllOrders() {
    return this.http.get<OrderResponse[]>(`${this.baseUrl}`);
  }

  getOrdersByUserId() {
    return this.http.get<OrderResponse[]>(`${this.baseUrl}/my-orders`);
  }

  getOrderById(id: number) {
    return this.http.get<OrderResponse>(`${this.baseUrl}/${id}`);
  }

  createOrder(orderForm: OrderFormRequest) {
    return this.http.post<OrderResponse>(`${this.baseUrl}/checkout`, orderForm);
  }

  updateStatus(orderId: number) {
    return this.http.post(`${this.baseUrl}/update-status`, orderId);
  }
}
