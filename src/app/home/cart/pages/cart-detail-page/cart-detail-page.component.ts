import { OrderService } from './../../../../services/order.service';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';
import { CartResponse } from '../../interfaces/cart-response.interface';
import { CartService } from '../../../../services/cart.service';
import { OrderFormRequest } from '../../../order/interfaces/order-form-request.interface';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
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
  router = inject(Router);
  route = inject(ActivatedRoute);

  readonly cart = this.cartService.cart;
  readonly cartItems = this.cartService.cartItems;
  readonly error = this.cartService.error;
  readonly isLoading = this.cartService.isLoading;



}
