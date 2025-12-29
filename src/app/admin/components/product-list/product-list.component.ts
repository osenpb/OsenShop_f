import { rxResource } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../services/product.service';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { DecimalPipe } from '@angular/common';
import { EditProductModalComponent } from "../edit-product-modal.component/edit-product-modal.component";
import { ProductResponse } from '../../../product/interfaces/product-response.interface';

@Component({
  selector: 'app-admin-product-list',
  imports: [DecimalPipe, EditProductModalComponent],
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {

  private ProductService = inject(ProductService);

  selectedProductId = signal<number | null>(null);




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
    this.isEditModalOpen.set(true);
    this.selectedProductId.set(id);
  }
  onDelete(id: number){

  }

  // Modal

  isEditModalOpen = signal(false);


  closeModal() {
    this.isEditModalOpen.set(false);
  }

  onProductUpdated() {
  this.productoResource.reload();
  this.closeModal();
}

}

