import React, { useEffect, useState } from 'react';
// @ts-ignore Could not find a declaration file for module 'react-notifications'.
import { NotificationManager } from 'react-notifications';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { updateCartItem } from '@/stores/slices/cart';

import styles from '../styles/Home.module.css';
import ProductCard from './ProductCard';

export default function Products() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => Object.values(state.catalog.items));

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
    <div className={styles.cardContainer}>
      <h1>Shop the Candles</h1>
      <div className={styles.flex}>
        {/* Passes Products To cards */}
        {items.map((item) => (
          <ProductCard
            key={item.id}
            productId={item.id}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
