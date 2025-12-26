import { ChangeDetectionStrategy, Component, EventEmitter, inject } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { AuthService } from '../../../../services/auth.service';
import { OrderFormRequest } from '../../interfaces/order-form-request.interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {

  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder)
  private router = inject(Router);

  readonly user = this.authService.user;

    order: OrderFormRequest = {
    shippingAddress: ''
  };


  readonly form = this.fb.nonNullable.group({
    shippingAddress: ['', [Validators.required, Validators.minLength(10)]]
  });


  onSubmit() {
    if (this.form.invalid) return;
    this.orderService.createOrder(this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(['/home/index']),
      error: () => console.log('error')
    });
  }

}
