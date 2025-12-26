import { CartService } from './../../../../services/cart.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-summary',
  imports: [RouterLink, CommonModule],
  templateUrl: './cart-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartSummaryComponent {

  cartService = inject(CartService);



}
