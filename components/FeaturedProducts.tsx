import Link from 'next/link';
import React, { useEffect, useState } from 'react';
// @ts-ignore Could not find a declaration file for module 'react-notifications'.
import { NotificationManager } from 'react-notifications';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateCartItem } from '@/stores/slices/cart';
import { FEATURED_PRODUCTS_IDS } from '@/utils/constants';

import styles from '../styles/Home.module.css';
import ProductCard from './ProductCard';

export default function FeatureProducts() {
  const dispatch = useAppDispatch();

  function addToCart({
    productId,
    quantity,
  }: {
    productId: string;
    quantity: number;
  }) {
    dispatch(updateCartItem({ id: productId, quantity }));
    NotificationManager.success('Successfully Added to Cart!', 'Success', 2000);
  }

  return (
    <div className={`${styles['container']} `} style={{ textAlign: 'center' }}>
      <h1>Feature Products</h1>
      <div className={styles.flex}>
        {FEATURED_PRODUCTS_IDS.map((productId) => (
          <div key={productId}>
            <ProductCard productId={productId} addToCart={addToCart} />
          </div>
        ))}
      </div>
      <Link href="/products">
        <button style={{ marginTop: '3rem' }}>Shop All Candles</button>
      </Link>
    </div>
  );
}
