import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CategoryResponse } from '../product/interfaces/category-response.interface';
import { CategoryRequest } from '../product/interfaces/category-request.interface';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly baseUrl = 'http://localhost:8080/api/v1/categories';
  private http = inject(HttpClient);

  getAllCategories() {
    return this.http.get<CategoryResponse[]>(`${this.baseUrl}`);
  }

  getCategoryById(id: number) {
    return this.http.get<CategoryResponse>(`${this.baseUrl}/${id}`);
  }

  createCategory(category: CategoryRequest) {
    return this.http.post<CategoryResponse>(`${this.baseUrl}`, category);
  }

  updateCategory(id: number, category: CategoryRequest) {
    return this.http.put<CategoryResponse>(`${this.baseUrl}/$id}`, category);
  }
}
