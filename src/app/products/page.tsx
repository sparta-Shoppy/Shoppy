'use client';
import Header from '@/components/common/Header';
import Product from '@/components/products/Product';
import { Suspense } from 'react';

export default function ProductPage() {
  return (
    <div>
      <Header />
      <Suspense>
        <Product />
      </Suspense>
    </div>
  );
}
