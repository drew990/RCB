import React from "react";
import styles from "../styles/Home.module.css";

function ProductList() {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.flex}>
        <div className={styles.card}>Card</div>
        <div className={styles.card}>Card</div>
        <div className={styles.card}>Card</div>
      </div>
    </div>
  );
}

export default ProductList;
