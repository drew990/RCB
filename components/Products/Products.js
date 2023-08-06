import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';

import styles from '../../styles/Home.module.css';
import ProductCards from './ProductCards/ProductCards';

export default function Products({ products }) {
  let [orders, setOrders] = useState();

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
        // Adds the new Amount
        newQuantity =
          Number(orders[productValue[0]].Quantity) + Number(productValue[1]);

        const newOrder = JSON.parse(localStorage.getItem('cart'));
        let key = productValue[0];
        newOrder[key].Quantity = newQuantity;

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

  function convertPrice(amount) {
    return (amount / BigInt(100)).toString();
  }

  return (
    <div className={styles.cardContainer}>
      <h1>Shop the Candles</h1>
      <div className={styles.flex}>
        <React.StrictMode>
          {/* Passes Products To cards */}
          {products.map((product) => (
            <div key={product[0].id}>
              <ProductCards
                productID={product[0].id}
                ImageURL={product[1].imageData.url}
                name={product[0].itemData.name}
                price={convertPrice(
                  product[0].itemData.variations[0].itemVariationData.priceMoney
                    .amount
                )}
                description={product[0].itemData.description}
                addToCart={addToCart}
              />
            </div>
          ))}
        </React.StrictMode>
      </div>
    </div>
  );
}
