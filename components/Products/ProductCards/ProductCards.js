import React, { useEffect, useState } from "react";
import styles from "../../../styles/Home.module.css";
import Image from "next/image";
import { NotificationManager } from "react-notifications";
import { motion } from "framer-motion";

function ProductCards({ productID, ImageURL, name, price }) {
  let [orders, setOrders] = useState();

  // console.log("Your Products Are: ", products);

  useEffect(() => {
    let data = window.localStorage.getItem("cart");
    if (data !== null) setOrders(JSON.parse(data));

    // console.log("ORDERS ARE", orders);
  }, []);

  useEffect(() => {
    if (orders != null) {
      window.localStorage.setItem("cart", JSON.stringify(orders));
      // console.log("Orders:", orders);
    }
  }, [orders]);

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
    <motion.div
      id={productID}
      className={styles.card}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <Image
        src={ImageURL}
        alt="Image Here"
        layout="responsive"
        width={50}
        height={50}
        blurDataURL="URL"
        placeholder="blur"
      />
      <div className={styles.cardText}>
        <h4>{name}</h4>
        <p>${price}</p>
        <div>
          <button onClick={addToCart} value={productID}>
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCards;
