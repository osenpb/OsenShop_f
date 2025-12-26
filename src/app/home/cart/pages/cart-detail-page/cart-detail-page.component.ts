import { OrderService } from './../../../../services/order.service';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';
import { CartResponse } from '../../interfaces/cart-response.interface';
import { CartService } from '../../../../services/cart.service';
import { OrderFormRequest } from '../../../order/interfaces/order-form-request.interface';
import { RouterLink } from "@angular/router";
import { CartItemListComponent } from "../../components/cart-item-list/cart-item-list.component";
import { CartSummaryComponent } from "../../components/cart-summary/cart-summary.component";

@Component({
  selector: 'app-cart-detail-page',
  imports: [CartItemListComponent, CartSummaryComponent],
  templateUrl: './cart-detail-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailPageComponent {

  cartService = inject(CartService);

  cartItems = computed(() => this.cartService.cartItems);

  cart = computed(() => this.cartService.cart);
  error = computed(() => this.cartService.error);

  isLoading = computed(() => this.cartService.isLoading);

  ngOnInit() {
    this.cartService.loadCart();
  }


}
