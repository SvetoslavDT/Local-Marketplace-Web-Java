import { OutputProductMakerDto } from "./output-product-maker.dto";

export interface ProductDetailsDto {
  id: number;
  productType: string;
  name: string;
  description: string;
  productPicturePath?: string | null;
  price: number;
  quantity: number;
  maker: OutputProductMakerDto;
}
