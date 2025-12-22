import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckoutComponent } from "../../components/checkout-form/checkout-form.component";

@Component({
  selector: 'app-checkout-form-page.component',
  imports: [CheckoutComponent],
  templateUrl: './checkout-form-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutFormPageComponent { }
