import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// @ts-ignore Could not find a declaration file for module 'react-notifications'.
import { NotificationManager } from 'react-notifications';
import { v4 as uuidv4 } from 'uuid';

import { CartItem } from '@/components/CartItem';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useCartSummary } from '@/hooks/useCartSummary';
import { wrapper } from '@/stores';
import { deleteCartItem } from '@/stores/slices/cart';
import { fetchCatalogObjects } from '@/stores/slices/catalog';

import styles from '../styles/Home.module.css';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const items = store.getState().cart.items;
    const itemIds = Object.keys(items);
    await store.dispatch(
      fetchCatalogObjects({ ids: itemIds, includeRelatedObjects: true })
    );

    return { props: {} };
  }
);

export default function Cart() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItemsQuantities = useAppSelector((state) => state.cart.items);
  const cartItemsIds = Object.keys(cartItemsQuantities);

  const { taxes, total, shipping, subtotal } = useCartSummary();

  const idempotency = uuidv4();

  function removeItem(productId: string) {
    dispatch(deleteCartItem({ id: productId }));
    NotificationManager.success(
      'Successfully Remove Item from Cart',
      'Remove Entire Item From Cart',
      2000
    );
  }

  const handleSubmit = async () => {
    // Sends Data to Square and receives link to payment
    const response = await fetch('/api/sendOrder', {
      method: 'POST',
      body: JSON.stringify({
        idempotency: idempotency,
        orderIds: cartItemsQuantities,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log('data', data);
    router.push(data.paymentLink.url);
  };

  return (
    <div className={styles.cartBackground}>
      <Head>
        <title>RCBrilliance - Cart</title>
        <meta name="description" content="RCBrilliance Cart Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {cartItemsIds.length > 0 ? (
        <div className={`${styles['cartConatiner']} ${styles['cartFlex']}`}>
          <div className={styles.cartFlexSize1}>
            <div className={styles.flex}>
              <div className={`${styles['flex']} ${styles['fullWidth']}`}>
                <h3>Product</h3>
                <h3>Price</h3>
                <h3>Quantity</h3>
                <h3>Total</h3>
                <h3>Remove</h3>
              </div>

              {cartItemsIds.map((cartItemId) => (
                <CartItem
                  key={cartItemId}
                  productId={cartItemId}
                  onRemoveitem={() => removeItem(cartItemId)}
                />
              ))}
            </div>
          </div>
          <aside
            className={`${styles['cartAside']} ${styles['cartFlexSize2']}`}
          >
            <div className={styles.cartAsideText}>
              <h2>Your Shopping Cart</h2>
              <h3>Subtotal: {subtotal}</h3>
              <h3>Taxes: {taxes}</h3>
              <h3
                style={{
                  borderBottom: '2px solid',
                  width: '40%',
                  marginBottom: '0.5rem',
                }}
              >
                Shipping: {shipping}
              </h3>
              <h3 style={{ marginBottom: '0.5rem' }}>Total: {total}</h3>
              <div
                style={{ width: '100%' }}
                onSubmit={handleSubmit}
                className={styles.checkoutForm}
              >
                <div
                  style={{
                    width: '110%',
                    margin: 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <button className={styles.blackButton} onClick={handleSubmit}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <div
          className={styles.cartConatiner}
          style={{
            padding: '3rem',
            textAlign: 'center',
            maxWidth: '700px ',
            width: '100%',
          }}
        >
          <h1 style={{ paddingBottom: '2rem' }}>
            Sorry! There&apos;s No Items In Your Shopping Cart
          </h1>
          <h2 style={{ paddingBottom: '2rem' }}>Add Some To Your Cart</h2>
          <Link href="/products">
            <button>Shop Now</button>
          </Link>
        </div>
      )}
    </div>
  );
}
