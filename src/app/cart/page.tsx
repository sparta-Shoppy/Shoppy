import Header from '@/components/common/Header';
import { ProductType } from '@/types/product-type';
import { TiShoppingCart } from 'react-icons/ti';

export default function CartPage() {
  const hasProducts = '';
  //products && products.length > 0;

  return (
    <section>
      <Header />
      <p>
        장바구니
        <TiShoppingCart />
      </p>
      {!hasProducts && <p>장바구니에 상품이 없습니다. 열심히 쇼핑해주세요</p>}
    </section>
  );
}
