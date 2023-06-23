import React, { useEffect, useState } from "react";
import FeatureProductCards from "./FeatureProductCards/FeatureProductCards";
import { NotificationManager } from "react-notifications";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function FeatureProducts({ products }) {
  let [orders, setOrders] = useState();

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

    let newQuantity = 0;
    // Gets Value from Target Event
    var productValue = e.target.value;
    productValue = productValue.split(",");

    // Gets product ID and keeps it in local storage
    if (orders != null) {
      // Checks if Id exist already in cart
      if (orders[productValue[0]] != undefined) {
        console.log("Product In Cart", orders[productValue[0]].Quantity);

        // Adds the new Amount
        newQuantity =
          Number(orders[productValue[0]].Quantity) + Number(productValue[1]);

        const newOrder = JSON.parse(localStorage.getItem("cart"));
        let key = productValue[0];
        newOrder[key].Quantity = newQuantity;
        console.log("Test ", newOrder[key]);

        setOrders(newOrder);
      }
      // If not, adds to cart
      else {
        console.log("Product not in cart");

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
    NotificationManager.success("Successfully Added to Cart!", "Success", 2000);
    // localStorage.setItem("cart", JSON.stringify(orders));
  }

  function convertPrice(amount) {
    return amount / 100;
  }
  return (
    <div className={`${styles["container"]} `} style={{ textAlign: "center" }}>
      <h1>Feature Products</h1>
      <div className={styles.flex}>
        {products.map((product) => (
          <div key={product.id}>
            <FeatureProductCards
              productID={product.id}
              name={product.itemData.name}
              ImageURL={product.itemData.imageIds.imageData.url}
              price={convertPrice(
                product.itemData.variations[0].itemVariationData.priceMoney
                  .amount
              )}
              addToCart={addToCart}
            />
          </div>
        ))}
      </div>
      <Link href="/Products">
        <button style={{ marginTop: "3rem" }}>Shop All Candles</button>
      </Link>
    </div>
  );
}
