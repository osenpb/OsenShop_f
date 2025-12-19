import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { ProductResponse } from '../../interfaces/product-response.interface';
import { rxResource } from '@angular/core/rxjs-interop';

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

  productId = computed(() => {
    return Number(this.route.snapshot.paramMap.get('id'));
  });

  productResource = rxResource<ProductResponse, void>({
    stream: () => this.ProductService.getProductById(this.productId()),
    }
  );

  product = computed(() => {
    return this.productResource.value()
  });

  error = computed(() => this.productResource.error());
  isLoading = computed(() => this.productResource.isLoading());



}
