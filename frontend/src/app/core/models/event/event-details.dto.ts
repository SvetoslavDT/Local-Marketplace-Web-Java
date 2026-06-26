import { DiscountType } from './event-types.dto';

export interface EventDetailsDto {
  id: number;
  title: string;
  description: string;
  type: string;
  ownerUsername: string;
  startDate: string | null;
  endDate: string | null;
  active: boolean;
  content: string | null;
  location: string | null;
  discountType: DiscountType | null;
  discountValue: number | null;
}
