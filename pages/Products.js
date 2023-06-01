import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NotificationManager } from "react-notifications";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/productsSqu");
  const data = await res.json();

  return {
    props: { products: data },
  };
};

// const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") );

function Products({ products }) {
  let [orders, setOrders] = useState();

  useEffect(() => {
    let data = window.localStorage.getItem("cart");
    if (data !== null) setOrders(JSON.parse(data));

    console.log("ORDERS ARE", orders);
  }, []);

  useEffect(() => {
    if (orders != null) {
      window.localStorage.setItem("cart", JSON.stringify(orders));
      console.log("Orders:", orders);
    }
  }, [orders]);

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

  console.log(products);

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
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <Image
                src={product[1].imageData.url}
                alt="Image Here"
                layout="responsive"
                width={50}
                height={50}
              />
              <div className={styles.cardText}>
                {product[2] ? (
                  <>
                    <h5
                      id={product[2].itemOptionData.values[0].id}
                      value={
                        product[2].itemOptionData.values[0].itemOptionValueData
                          .name
                      }
                    >
                      {
                        product[2].itemOptionData.values[0].itemOptionValueData
                          .name
                      }
                    </h5>
                  </>
                ) : (
                  ""
                )}
                <h4>{product.id}</h4>
                <h4>{product[0].itemData.name}</h4>
                <p>
                  $
                  {convertPrice(
                    product[0].itemData.variations[0].itemVariationData
                      .priceMoney.amount
                  )}
                </p>
                {/* <div>
                  <button
                    onclick={() => {
                      console.log("Add quantity");
                      setQuantity(quantity + 1);
                    }}
                  >
                    +
                  </button>
                  <div>{quantity}</div>
                  <div>-</div>
                </div> */}
                <div>
                  <button onClick={addToCart} value={product[0].id}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </React.StrictMode>
      </div>
    </div>
  );
}

export default Products;
