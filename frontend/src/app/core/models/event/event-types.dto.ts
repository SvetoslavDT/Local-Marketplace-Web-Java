export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
  FREE_SHIPPING = 'FREE_SHIPPING'
}

export interface StorytellingInfo {
  content: string;
}

export interface CraftFairInfo {
  location: string;
}

export interface PromotionalCampaignInfo {
  discountType: DiscountType;
  discountValue: number;
}
