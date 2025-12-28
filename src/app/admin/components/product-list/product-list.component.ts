import { rxResource } from '@angular/core/rxjs-interop';
import { ProductService } from './../../../services/product.service';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ProductResponse } from '../../../home/product/interfaces/product-response.interface';
import { DecimalPipe } from '@angular/common';
import { EditProductModalComponent } from "../edit-product-modal.component/edit-product-modal.component";

@Component({
  selector: 'app-admin-product-list',
  imports: [DecimalPipe, EditProductModalComponent],
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {

  private ProductService = inject(ProductService);

  productoResource = rxResource<ProductResponse[], void>({
    stream: () => this.ProductService.getAllProducts(),
  })

  products = computed<ProductResponse[]>(() => {
    return this.productoResource.value() ?? [];
  })

  isLoading = computed<boolean>(() => this.productoResource.isLoading());
  error = computed(() => this.productoResource.error());

  onEdit(id: number){
    console.log(id);
    this.isModalOpen.set(true);
  }
  onDelete(id: number){

  }

  // Modal

  isModalOpen = signal(false);


  closeModal() {
    this.isModalOpen.set(false);
  }

}

