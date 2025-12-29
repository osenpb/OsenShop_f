import { ProductResponse } from "../../product/interfaces/product-response.interface";

export interface OrderItemResponse {
  id: number;
  price: number
  quantity: number;
  orderId: number;
  productResponse: ProductResponse;
}
