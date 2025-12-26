import { computed, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';

import { CartResponse } from '../home/cart/interfaces/cart-response.interface';
import { CartItemResponse } from '../home/cart/interfaces/cart-item-response.interface';

@Injectable({ providedIn: 'root' })
export class CartService {

  private readonly baseUrl = 'http://localhost:8080/api/v1/cart';
  private readonly http = inject(HttpClient);

  // === RESOURCE ===
  readonly cartResource = rxResource<CartResponse, void>({
    stream: () => this.http.get<CartResponse>(this.baseUrl),
  });

  // === RESOURCE STATE HELPERS ===
  readonly isLoading = computed(() => this.cartResource.isLoading());
  readonly error = computed(() => this.cartResource.error());
  readonly cart = computed(() => this.cartResource.value());

  // === DERIVED STATE ===
  readonly cartItems = computed<CartItemResponse[]>(() => {
    return this.cart()?.cartItemsResponse ?? [];
  });

  readonly total = computed(() =>
    this.cartItems().reduce(
      (acc, item) =>
        acc + item.productResponse.price * item.quantity,
      0
    )
  );

  // === ACTIONS ===
  removeFromCart(productId: number) {
    this.http
      .delete(`${this.baseUrl}/remove/${productId}`)
      .subscribe(() => this.cartResource.reload());
  }

  addToCart(productId: number, quantity: number) {
    this.http
      .post(`${this.baseUrl}/add`, { productId, quantity })
      .subscribe(() => this.cartResource.reload());
  }

  updateQuantity(productId: number, quantity: number) {
    this.http
      .post(`${this.baseUrl}/${productId}/update`, { quantity })
      .subscribe(() => this.cartResource.reload());
  }
}
