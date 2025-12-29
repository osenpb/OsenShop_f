import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-my-orders.component',
  imports: [],
  templateUrl: './my-orders-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOrdersComponent { }
