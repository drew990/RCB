import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// @ts-ignore Could not find a declaration file for module 'react-notifications'.
import { NotificationManager } from 'react-notifications';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { wrapper } from '@/stores';
import { updateCartItem } from '@/stores/slices/cart';
import { fetchCatalogObject } from '@/stores/slices/catalog';
import { formatPriceMoney } from '@/utils/numbers';

import styles from '../../styles/Home.module.css';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const productId = context.params?.id?.toString();
    if (productId) {
      await store.dispatch(
        fetchCatalogObject({ id: productId, includeRelatedObjects: true })
      );
    }

    return { props: {} };
  }
);

export default function ProductDetails() {
  const dispatch = useAppDispatch();
  let [quantity, setQuantity] = useState(1);

  const router = useRouter();
  const productId = router.query.id?.toString() ?? '';
  const item = useAppSelector((state) => state.catalog.items[productId]);
  const image = useAppSelector(
    (state) => state.catalog.images[item?.imageIds?.[0] ?? '']
  );
  const name = item?.name ?? '';
  const description = item?.description ?? '';
  const price = formatPriceMoney(
    item?.variations?.[0]?.itemVariationData?.priceMoney
  );

  function addToCart() {
    dispatch(updateCartItem({ id: productId, quantity }));
    NotificationManager.success('Successfully Added to Cart!', 'Success', 2000);
  }

  function addQuantity() {
    setQuantity((quantity = quantity + 1));
    console.log('addQuantity has been click!', quantity);
  }

  function subtractQuantity() {
    if (quantity == 1) {
      NotificationManager.error("Can't Subtract Anymore!", 'Error', 2000);
    } else {
      setQuantity((quantity = quantity - 1));
    }

    console.log('subtractQuantity has been click!', quantity);
  }

  return (
    <div
      style={{ flexWrap: 'wrap' }}
      className={`${styles['flexRow']} ${styles['container']}`}
    >
      <div className={`${styles['imgContainer']} ${styles['flexSize1']}`}>
        <Image
          src={image?.url ?? ''}
          alt="Image Here"
          layout="intrinsic"
          width={600}
          height={600}
          blurDataURL="URL"
          placeholder="blur"
        />
      </div>
      <motion.section
        className={`${styles['textContainer']} ${styles['singleProductText']} ${styles['flexSize2']} `}
      >
        <motion.h1>{name}</motion.h1>
        <h2>{price}</h2>
        <div className={styles.border}></div>
        <p>{description}</p>
        <div
          style={{ maxWidth: '250px', margin: 'auto' }}
          className={`${styles['flexRow']} ${styles['cardAddCart']}`}
        >
          <div>
            <motion.h4
              style={{ cursor: 'pointer' }}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.95 }}
              onClick={subtractQuantity}
            >
              -
            </motion.h4>
          </div>
          <div>
            <h4>{quantity}</h4>
          </div>
          <div>
            <motion.h4
              style={{ cursor: 'pointer' }}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.95 }}
              onClick={addQuantity}
            >
              +
            </motion.h4>
          </div>
        </div>
        <div style={{ margin: '2rem auto', width: 'fit-content' }}>
          <button onClick={addToCart}>Add to Cart</button>
        </div>
      </motion.section>
    </div>
  );
}
