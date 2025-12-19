import { CategoryResponse } from "./category-response.interface";

export interface ProductResponse {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: CategoryResponse;
}
