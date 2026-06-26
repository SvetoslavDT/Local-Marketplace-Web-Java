import { ProductType } from './type';

export interface CreateProductRequest {
  productType: ProductType;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export type UpdateProductRequest = Partial<CreateProductRequest>;
