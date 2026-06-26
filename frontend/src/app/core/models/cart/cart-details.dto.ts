import { CartItemDto } from './cart-item.dto';

export interface CartDetailsDto {
  id: number;
  items: CartItemDto[];
  total: number;
}
