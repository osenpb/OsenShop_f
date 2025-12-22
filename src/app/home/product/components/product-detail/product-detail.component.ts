import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { ProductResponse } from '../../interfaces/product-response.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { CartService } from '../../../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../../../services/notification.service';
@Component({
  selector: 'app-home-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {

  private ProductService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private notification = inject(NotificationService);
  public Math = Math;

  // Signals
  quantity = signal(1);


  productId = computed(() => {
    return Number(this.route.snapshot.paramMap.get('id'));
  });

  productResource = rxResource<ProductResponse, void>({
    stream: () => this.ProductService.getProductById(this.productId()
      ),
  });

  product = computed(() => {
    return this.productResource.value()
  });

  error = computed(() => this.productResource.error());
  isLoading = computed(() => this.productResource.isLoading());

  // CartService actions

  isAddingToCart = signal(false); // for handling cart adding

  addToCart() { // I can implement exhaustMap pipe here, in other moment
    if (this.isAddingToCart()) return;

    const product = this.product();
    if (!product) return;

    this.isAddingToCart.set(true);

    this.cartService.addToCart(product.id, this.quantity())
      .subscribe({
        next: () => {
          this.quantity.set(1);
          this.isAddingToCart.set(false);
          this.notification.success('Producto agregado al carrito');
        },
        error: () => {
          this.isAddingToCart.set(false);
        }
    });
  }

  // Quantity handling

  increase() {
    this.quantity.set(this.clampQuantity(this.quantity() + 1));
  }

  decrease() {
    this.quantity.set(this.clampQuantity(this.quantity() - 1));
  }

  setQuantity(value: number) {
    this.quantity.set(this.clampQuantity(value));
  }

  private clampQuantity(value: number) {
    const stock = this.product()!.stock;
    return Math.min(Math.max(1, value), stock);
  }


}
