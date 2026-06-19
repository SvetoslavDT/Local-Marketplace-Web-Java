import { ProductType } from './type';

export interface ProductFilters {
  productTypes: ProductType[];
  makerUsername: string;
  inStock: boolean | null;
}
