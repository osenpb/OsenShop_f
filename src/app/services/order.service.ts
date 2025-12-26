import { HttpClient } from '@angular/common/http';

import { inject, Injectable } from '@angular/core';
import { OrderResponse } from '../home/order/interfaces/order-response.interface';
import { OrderFormRequest } from '../home/order/interfaces/order-form-request.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly baseUrl = 'http://localhost:8080/api/v1/orders';
  private http = inject(HttpClient);

  getAllOrders() {
    return this.http.get<OrderResponse[]>(`${this.baseUrl}`);
  }

  getOrderById(id: number) {
    return this.http.get<OrderResponse>(`${this.baseUrl}/${id}`);
  }

  createOrder(orderForm: OrderFormRequest) {
    return this.http.post<OrderResponse>(`${this.baseUrl}/checkout`, orderForm);
  }


}
