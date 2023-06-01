import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { NotificationManager } from "react-notifications";
import { motion } from "framer-motion";
import ProductCards from "./ProductCards/ProductCards";

export default function Products({ products }) {
  // let [orders, setOrders] = useState();

  // // console.log("Your Products Are: ", products);

  // useEffect(() => {
  //   let data = window.localStorage.getItem("cart");
  //   if (data !== null) setOrders(JSON.parse(data));

  //   // console.log("ORDERS ARE", orders);
  // }, []);

  // useEffect(() => {
  //   if (orders != null) {
  //     window.localStorage.setItem("cart", JSON.stringify(orders));
  //     // console.log("Orders:", orders);
  //   }
  // }, [orders]);

  function getCart() {
    let key = "products";
    let data = [];

    data = window.localStorage.getItem(key);

    if (data !== null) {
      console.log("Data is not null!");
      console.log("DATA", data);
    } else {
      console.log("data is null");
    }
  }

  // console.log(products);

  function convertPrice(amount) {
    return amount / 100;
  }

  // useEffect(() => {}, []);

  function addToCart(e) {
    e.preventDefault();
    // Gets product ID and keeps it in local storage
    if (orders != null) {
      setOrders([...orders, e.target.value]);
    } else {
      setOrders([e.target.value]);
    }
    NotificationManager.success("Successfully Added to Cart!", "Success", 2000);
    // localStorage.setItem("cart", JSON.stringify(orders));
  }

  return (
    <div className={styles.cardContainer}>
      <h1>Shop the Candles</h1>
      <div className={styles.flex}>
        <React.StrictMode>
          {/* Passes Products To cards */}
          {products.map((product) => (
            <>
              <ProductCards
                key={product[0].id}
                productID={product[0].id}
                ImageURL={product[1].imageData.url}
                name={product[0].itemData.name}
                price={convertPrice(
                  product[0].itemData.variations[0].itemVariationData.priceMoney
                    .amount
                )}
              />
            </>
          ))}
        </React.StrictMode>
      </div>
    </div>
  );
}
