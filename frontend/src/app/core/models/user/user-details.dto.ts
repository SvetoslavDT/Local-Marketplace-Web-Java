import { UserType } from './type';
import { OutputUserProductDto } from './output-user-product.dto';

export interface UserDetailsDto {
  username: string;
  email: string;
  userType: UserType;
  products: OutputUserProductDto[];
}
