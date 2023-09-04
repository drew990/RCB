import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FC, MouseEvent, useState } from 'react';
// @ts-ignore Could not find a declaration file for module 'react-notifications'.
import { NotificationManager } from 'react-notifications';

import { useAppSelector } from '@/hooks/useAppSelector';
import { formatPriceMoney } from '@/utils/numbers';

import styles from '../styles/Home.module.css';

type Props = {
  productId: string;
  addToCart: (props: { productId: string; quantity: number }) => void;
};

const ProductCard: FC<Props> = ({ productId, addToCart }) => {
  const item = useAppSelector((state) => state.catalog.items[productId]);
  const image = useAppSelector(
    (state) => state.catalog.images[item?.imageIds?.[0] ?? '']
  );
  const name = item?.name ?? '';
  const price = formatPriceMoney(
    item?.variations?.[0]?.itemVariationData?.priceMoney
  );
  let [quantity, setQuantity] = useState(1);

  function addQuantity(e: MouseEvent<HTMLHeadingElement>) {
    e.preventDefault();
    setQuantity((quantity = quantity + 1));
  }

  function subtractQuantity(e: MouseEvent<HTMLHeadingElement>) {
    e.preventDefault();

    if (quantity == 1) {
      NotificationManager.error("Can't Subtract Anymore!", 'Error', 2000);
    } else {
      setQuantity((quantity = quantity - 1));
    }
  }

  return (
    <motion.div
      key={productId}
      className={styles.card}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <Link href={`/products/${productId}`}>
        <Image
          src={image?.url ?? ''}
          alt={image?.caption ?? name}
          loading="lazy"
          width={250}
          height={250}
        />
      </Link>
      <div className={styles.cardText}>
        <h4>{name}</h4>
        {price && <h4 style={{ padding: '0' }}>{price}</h4>}
        <div className={`${styles['flexRow']} ${styles['cardAddCart']}`}>
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
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart({ productId, quantity });
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
