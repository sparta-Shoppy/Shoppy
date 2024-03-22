import { ProductType } from './product-type';

export interface CartButtonType {
  item: ProductType;
  userId: string;
}

export interface UpdateCartProps {
  userId: string;
  productId: string;
  quantity: number;
}

export interface DeleteCartProps {
  userId: string;
  productId: string;
}
