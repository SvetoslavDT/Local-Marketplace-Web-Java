import { ProductDetailsDto } from '../product/product-details.dto';

export interface CartItemDto {
  id: number;
  product: ProductDetailsDto;
  quantity: number;
  subtotal: number;
}
