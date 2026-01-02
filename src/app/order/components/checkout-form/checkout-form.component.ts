import { ChangeDetectionStrategy, Component, EventEmitter, inject } from '@angular/core';

import { OrderFormRequest } from '../../interfaces/order-form-request.interface';

import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-checkout-form',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {

  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private cartService = inject(CartService);

  private fb = inject(FormBuilder)
  private router = inject(Router);
  readonly user = this.authService.user;

  cart = this.cartService.cart;

  order: OrderFormRequest = {
    shippingAddress: ''
  };


  readonly form = this.fb.nonNullable.group({
    shippingAddress: ['', [Validators.required, Validators.minLength(10)]]
  });


  onSubmit() {
    if (this.form.invalid) return;
    this.orderService.createOrder(this.form.getRawValue())
    .subscribe({
      next: () => {
        this.cartService.cartResource.reload();
        this.router.navigate(['/home/index'])
      },
      error: () => console.log('error')
    });
  }

}
