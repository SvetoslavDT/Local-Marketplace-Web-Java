import { CurrencyType } from './currency-type';
import { OrderStatus } from './order-status';
import { OrderItemDto } from './order-item.dto';

export interface OrderDetailsDto {
  id: number;
  username: string;
  currency: CurrencyType;
  totalAmount: number;
  status: OrderStatus;
  orderItems: OrderItemDto[];
}
