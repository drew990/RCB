import { useState } from "react";
import styles from "../../../styles/Home.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FeatureProductCards({
  productID,
  name,
  ImageURL,
  price,
  addToCart,
}) {
  let [quantity, setQuantity] = useState(1);

  function addQuantity(e) {
    e.preventDefault();

    setQuantity((quantity = quantity + 1));
    console.log("addQuantity has been click!", quantity);
  }

  function subtractQuantity(e) {
    e.preventDefault();

    if (quantity == 1) {
      NotificationManager.error("Can't Subtract Anymore!", "Error", 2000);
    } else {
      setQuantity((quantity = quantity - 1));
    }

    console.log("subtractQuantity has been click!", quantity);
  }

  return (
    <motion.div
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
        <div className={`${styles["flexRow"]} ${styles["cardAddCart"]}`}>
          <div>
            <motion.h4
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.95 }}
              onClick={addQuantity}
            >
              +
            </motion.h4>
          </div>
          <div>
            <h4>{quantity}</h4>
          </div>
          <div>
            <motion.h4
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.95 }}
              onClick={subtractQuantity}
            >
              -
            </motion.h4>
          </div>
        </div>
        <div>
          <button onClick={addToCart} value={[productID, quantity]}>
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
