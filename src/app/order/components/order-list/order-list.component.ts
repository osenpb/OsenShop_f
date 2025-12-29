import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-order-list.component',
  imports: [],
  templateUrl: './order-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent { }
