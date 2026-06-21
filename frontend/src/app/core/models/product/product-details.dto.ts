import { OutputProductMakerDto } from "./output-product-maker.dto";

export interface ProductDetailsDto {
  id: number;
  type: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  price: number;
  quantity: number;
  maker: OutputProductMakerDto;
}
