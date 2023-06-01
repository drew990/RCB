import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Trash from "../images/trash.png";
import { motion } from "framer-motion";
import { NotificationManager } from "react-notifications";

function Cart() {
  const [orders, setOrders] = useState();
  const [displayOrders, setDisplayOrders] = useState([]);
  // const [totalAmount, setTotalAmount] = useState(0);
  let totalCost = 0;

  useEffect(() => {
    // const item = "Hello";
    const data = window.localStorage.getItem("cart");
    const items = JSON.parse(data);
    setOrders(items);
  }, []);

  // Handles order Changes
  useEffect(() => {
    async function callAPI(orders) {
      console.log("API CALLED");
      console.log("ID PASSED", orders);

      try {
        const res = await fetch(`http://localhost:3000/api/customerOrder`, {
          method: "POST",
          body: JSON.stringify({ orders }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log("data", data);
        setDisplayOrders(data);
      } catch (err) {
        console.log(err);
      }
    }

    // Calls API
    callAPI(orders);
  }, [orders]);

  function convertPrice(amount) {
    // setTotalAmount(totalAmount + amount / 100);
    return amount / 100;
  }

  function removeItem(e) {
    e.preventDefault();
    NotificationManager.success(
      "Successfully Remove Item from Cart",
      "Remove Entire Item From Cart",
      2000
    );
    // Gets ID to remove Item
    const productId = e.target.id;
    let storage = JSON.parse(window.localStorage.cart);

    // Deletes every ID that was given
    for (let x = 0; x < storage.length; x++) {
      if (storage[x] == productId) {
        storage.splice(x, 1);
        x--;
      }
    }
    // Re-Enters in data into local storage
    localStorage.setItem("cart", JSON.stringify(storage));
    // Reloads Page to give the updated cart
    location.reload();
  }

  function getProductTotal(quantity, price) {
    return Number(quantity * price) / 100;
  }

  return (
    <div className={styles.cartBackground}>
      <div className={`${styles["cartConatiner"]} ${styles["cartFlex"]}`}>
        <div className={styles.cartFlexSize1}>
          <h1>Your Shopping Cart</h1>
          <div className={styles.flex}>
            <div className={`${styles["flex"]} ${styles["fullWidth"]}`}>
              <h3>Product</h3>
              <h3>Price</h3>
              <h3>Quantity</h3>
              <h3>Total</h3>
            </div>

            {displayOrders.map((displayOrder) => {
              totalCost =
                totalCost +
                Number(
                  displayOrder[0][0].itemData.variations[0].itemVariationData
                    .priceMoney.amount
                ) *
                  displayOrder[1];
              return (
                <div
                  className={`${styles["flex"]} ${styles["fullWidth"]} ${styles["checkout_flex"]}`}
                  key={displayOrder[0][0].id}
                >
                  <div className={styles.cartFlexOrder}>
                    <Image
                      src={displayOrder[0][1].imageData.url}
                      alt="Image Here"
                      layout="fixed"
                      width={150}
                      height={150}
                    />
                    <h3>
                      {displayOrder[0][0].itemData.name} <br />
                    </h3>
                  </div>
                  <p className={styles.cartFlexOrder}>
                    $
                    {convertPrice(
                      displayOrder[0][0].itemData.variations[0]
                        .itemVariationData.priceMoney.amount
                    )}
                  </p>
                  <p className={styles.cartFlexOrder}>{displayOrder[1]}</p>
                  <p className={styles.cartFlexOrder}>
                    $
                    {getProductTotal(
                      displayOrder[1],
                      displayOrder[0][0].itemData.variations[0]
                        .itemVariationData.priceMoney.amount
                    )}
                  </p>
                  {/* <p>{displayOrder[0].id}</p> */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Image
                      src={Trash}
                      alt="Delete"
                      layout="fixed"
                      width={30}
                      height={30}
                      onClick={removeItem}
                      id={displayOrder[0][0].id}
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
        <aside className={`${styles["cartAside"]} ${styles["cartFlexSize2"]}`}>
          <div className={styles.cartAsideText}>
            <h2>Shopping Cart Subtotal</h2>
            <h3>${convertPrice(totalCost)}</h3>
            <p>SHIPPING & TAXES WILL BE CALCULATED AT CHECKOUT</p>
            <button>Checkout</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Cart;

// <div className={styles.flex}>
//   <h3>{}</h3>
//   <h3>Price</h3>
//   <h3>Quantity</h3>
//   <h3>Total</h3>
// </div>
