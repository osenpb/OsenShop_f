import { ChangeDetectionStrategy, Component, computed, inject,  } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductResponse } from '../../interfaces/product-response.interface';

@Component({
  selector: 'app-home-product-list',
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {

  private productService = inject(ProductService);
  private router = inject(Router);

  productResource = rxResource<ProductResponse[],void>({
    stream: () => this.productService.getAllProducts(),
    }
  );

  // productResource - signal handling
  products = computed<ProductResponse[]>(() => {
    return this.productResource.value() ?? [];
    }
  );

  isLoading = computed<boolean>(() => this.productResource.isLoading());
  error = computed(() => this.productResource.error());

  cargarProductos() {
    const productos = this.productResource.value();
    console.log(productos);
  }


}

