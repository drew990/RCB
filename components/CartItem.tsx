import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { formatPriceMoney } from '@/utils/numbers';

import Trash from '../images/cancel.png';
import styles from '../styles/Home.module.css';

type Props = {
  productId: string;
  onRemoveitem: () => void;
};

export const CartItem: FC<Props> = ({ productId, onRemoveitem }) => {
  const item = useAppSelector((state) => state.catalog.items[productId]);
  const image = useAppSelector(
    (state) => state.catalog.images[item.imageIds?.[0] ?? '']
  );
  const quantity = useAppSelector((state) => state.cart.items[productId]);

  return (
    <div
      className={`${styles['flex']} ${styles['fullWidth']} ${styles['checkout_flex']}`}
      key={item.id}
    >
      <div className={styles.cartFlexOrder}>
        <Image
          src={image?.url ?? ''}
          alt={image?.caption ?? item.name ?? ''}
          loading="lazy"
          width={150}
          height={150}
        />
        <h3>
          {item.name} <br />
        </h3>
      </div>
      <h3 className={styles.cartFlexOrder}>
        {formatPriceMoney(item?.variations?.[0]?.itemVariationData?.priceMoney)}
      </h3>
      <h4 className={styles.cartFlexOrder}>{quantity}</h4>
      <h3 className={styles.cartFlexOrder}>
        <div className={styles.cartNumFlex}>
          {formatPriceMoney({
            amount:
              Number(
                item?.variations?.[0]?.itemVariationData?.priceMoney?.amount ??
                  0
              ) * quantity,
            currency:
              item?.variations?.[0]?.itemVariationData?.priceMoney?.currency,
          })}
        </div>
      </h3>
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className={styles.cartFlexOrder}
      >
        <Image
          src={Trash}
          alt="Delete"
          layout="fixed"
          width={30}
          height={30}
          onClick={onRemoveitem}
          id={item.id}
        />
      </motion.div>
    </div>
  );
};
