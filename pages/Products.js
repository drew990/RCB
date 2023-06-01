import React from "react";
import ProductComponent from "../components/Products/Products";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/productsSqu");
  const data = await res.json();

  return {
    props: { products: data },
  };
};

export default function Products({ products }) {
  return (
    <div>
      <ProductComponent products={products} />
    </div>
  );
}
