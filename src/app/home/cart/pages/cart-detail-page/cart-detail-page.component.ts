import { OrderService } from './../../../../services/order.service';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';
import { CartResponse } from '../../interfaces/cart-response.interface';
import { CartService } from '../../../../services/cart.service';
import { OrderFormRequest } from '../../../order/interfaces/order-form-request.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart-detail-page',
  imports: [RouterLink],
  templateUrl: './cart-detail-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailPageComponent {

  private cartService = inject(CartService);
  private OrderService = inject(OrderService);

  cartResource = rxResource<CartResponse, void>({
    stream: () => this.cartService.getCartFromUser(),
  });

  isLoading = computed(() => this.cartResource.isLoading());
  error = computed(() => this.cartResource.error());
  cart = computed(() => this.cartResource.value());

  cartItems = computed(() => this.cartResource.value()?.cartItemsResponse) ?? [];

  total = computed(() => this.cartResource.value()?.total);

  removeFromCart(itemId: number) {
    this.cartService.removeFromCart(itemId).subscribe({
      next: () => {
        this.cartResource.reload();
      },
      error: () => {
        this.cartResource.reload();
      },
    });
  }

  // shop handling
  createOrder(orderFormRequest: OrderFormRequest) {
    this.OrderService.createOrder(orderFormRequest).subscribe;
  }



}
