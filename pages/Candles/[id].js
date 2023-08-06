import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';

import styles from '../../styles/Home.module.css';

// Checks Environment URL
const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://www.rcbrilliance.com/';

  return base_url;
};

export default function featureProducts() {
  let [orders, setOrders] = useState();
  let [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let data = window.localStorage.getItem('cart');
    if (data !== null) setOrders(JSON.parse(data));

    // console.log("ORDERS ARE", orders);
  }, []);

  useEffect(() => {
    if (orders != null) {
      window.localStorage.setItem('cart', JSON.stringify(orders));
      // console.log("Orders:", orders);
    }
  }, [orders]);

  function addToCart(e) {
    e.preventDefault();

    let newQuantity = 0;
    // Gets Value from Target Event
    var productValue = e.target.value;
    productValue = productValue.split(',');

    // Gets product ID and keeps it in local storage
    if (orders != null) {
      // Checks if Id exist already in cart
      if (orders[productValue[0]] != undefined) {
        console.log('Product In Cart', orders[productValue[0]].Quantity);

        // Adds the new Amount
        newQuantity =
          Number(orders[productValue[0]].Quantity) + Number(productValue[1]);

        const newOrder = JSON.parse(localStorage.getItem('cart'));
        let key = productValue[0];
        newOrder[key].Quantity = newQuantity;
        console.log('Test ', newOrder[key]);

        setOrders(newOrder);
      }
      // If not, adds to cart
      else {
        console.log('Product not in cart');

        setOrders({
          ...orders,
          [productValue[0]]: { Quantity: Number(productValue[1]) },
        });
      }
    } else {
      const newOrder = {
        [productValue[0]]: { Quantity: Number(productValue[1]) },
        // Quantity: ,
      };

      setOrders(newOrder);
    }
    NotificationManager.success('Successfully Added to Cart!', 'Success', 2000);
    // localStorage.setItem("cart", JSON.stringify(orders));
  }

  function addQuantity(e) {
    e.preventDefault();

    setQuantity((quantity = quantity + 1));
    console.log('addQuantity has been click!', quantity);
  }

  function subtractQuantity(e) {
    e.preventDefault();

    if (quantity == 1) {
      NotificationManager.error("Can't Subtract Anymore!", 'Error', 2000);
    } else {
      setQuantity((quantity = quantity - 1));
    }

    console.log('subtractQuantity has been click!', quantity);
  }

  // USe Route to get ID in order to get Info from Square
  const router = useRouter();
  const query = router.query;
  const id = query.id;
  const name = query.name;
  const ImageURL = query.URL;
  const price = query.price;
  const description = query.description;

  console.log(query);

  return (
    <div
      style={{ flexWrap: 'wrap' }}
      className={`${styles['flexRow']} ${styles['container']}`}
    >
      <div className={`${styles['imgContainer']} ${styles['flexSize1']}`}>
        <Image
          src={ImageURL}
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
        <h2>${price}</h2>
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
          <button onClick={addToCart} value={[id, quantity]}>
            Add to Cart
          </button>
        </div>
      </motion.section>
    </div>
  );
}

// export async function getServerSideProps() {
//   return {
//     props: { message: 'WELCOME' },
//   };
// }
