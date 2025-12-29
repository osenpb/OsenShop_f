import { ChangeDetectionStrategy, Component, computed, inject,  } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';
import { ProductResponse } from '../../interfaces/product-response.interface';
import { ProductService } from '../../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { LoadingSpinnerComponent } from '../../../home/components/loading-spinner/loading-spinner.component';


@Component({
  selector: 'app-home-product-list',
  imports: [ProductCardComponent, LoadingSpinnerComponent],
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {

  private productService = inject(ProductService);


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

