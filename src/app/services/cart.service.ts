import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CartResponse } from '../home/cart/interfaces/cart-response.interface';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8080/api/v1/cart';

  private http = inject(HttpClient);

  getCartFromUser() {
    return this.http.get<CartResponse>(this.baseUrl);
  }

  addToCart(productId: number, quantity: number) {
    return this.http.post(`${this.baseUrl}/add`, { productId, quantity });
  }

  removeFromCart(productId: number) {
    return this.http.delete<CartResponse>(`${this.baseUrl}/remove/${productId}`);
  }

  updateQuantity(productId: number, quantity: number) {
    return this.http.post<CartResponse>(`${this.baseUrl}/${productId}/update`, { quantity });
  }

}
