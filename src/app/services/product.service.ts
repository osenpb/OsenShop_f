
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductResponse } from '../product/interfaces/product-response.interface';
import { ProductRequest } from '../product/interfaces/product-request.interface';
import { UpdateProductRequest } from '../product/interfaces/update-product-request';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseUrl = `${environment.apiUrl}/products`;
  private http = inject(HttpClient);

  getAllProducts() {
    return this.http.get<ProductResponse[]>(`${this.baseUrl}`);
  }

  getProductById(id: number) {
    return this.http.get<ProductResponse>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: ProductRequest) {
    return this.http.post<ProductResponse>(`${this.baseUrl}`, product);
  }

  updateProduct(id: number, product: UpdateProductRequest) {
    return this.http.put<ProductResponse>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete<ProductResponse>(`${this.baseUrl}/${id}`);
  }

}
