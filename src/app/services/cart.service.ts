import { computed, inject, Injectable, signal } from "@angular/core";
import { CartResponse } from "../home/cart/interfaces/cart-response.interface";
import { HttpClient } from "@angular/common/http";
import { CartItemResponse } from "../home/cart/interfaces/cart-item-response.interface";

@Injectable({ providedIn: 'root' })
export class CartService {

  private baseUrl = 'http://localhost:8080/api/v1/cart';
  private http = inject(HttpClient);

  private readonly _cartItems = signal<CartItemResponse[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _cart = signal<CartResponse | null>(null);

  readonly cart = computed(() => this._cart());
  readonly cartItems = this._cartItems.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly total = computed(() =>
    this._cartItems().reduce(
      (acc, item) => acc + item.productResponse.price * item.quantity,
      0
    )
  );

  loadCart() {
    this._isLoading.set(true);

    this.http.get<CartResponse>(this.baseUrl).subscribe({
      next: res => this._cart.set(res),
      error: () => this._error.set('Error al cargar el carrito'),
      complete: () => this._isLoading.set(false)
    });
  }

  removeFromCart(productId: number) {
    this.http
      .delete<CartResponse>(`${this.baseUrl}/remove/${productId}`)
      .subscribe(res => this._cartItems.set(res.cartItemsResponse));
  }

  addToCart(productId: number, quantity: number) {
    this.http
      .post<CartResponse>(`${this.baseUrl}/add`, { productId, quantity })
      .subscribe(res => this._cartItems.set(res.cartItemsResponse));
  }

  updateQuantity(productId: number, quantity: number) {
    this.http
      .post<CartResponse>(`${this.baseUrl}/${productId}/update`, { quantity })
      .subscribe(res => this._cartItems.set(res.cartItemsResponse));
  }
}
