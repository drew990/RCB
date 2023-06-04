import React from "react";
import styles from "../../../styles/Home.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

function ProductCards({ productID, ImageURL, name, price, addToCart }) {
  // console.log("Your Products Are: ", products);

  return (
    <motion.div
      key={productID}
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
