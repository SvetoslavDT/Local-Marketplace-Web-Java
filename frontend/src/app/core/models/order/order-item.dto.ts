import { ProductDetailsDto } from '../product/product-details.dto';

export interface OrderItemDto {
  id: number;
  product: ProductDetailsDto;
  quantity: number;
  price: number;
}
