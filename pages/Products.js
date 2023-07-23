import Head from 'next/head';
import React from 'react';

import ProductComponent from '../components/Products/Products';
import { loadProducts } from '../lib/LoadProducts';

export const getServerSideProps = async () => {
  const data = await loadProducts();

  return {
    props: { products: data },
  };
};

export default function Products({ products }) {
  return (
    <div>
      <Head>
        <title>RCBrilliance - Products</title>
        <meta name="description" content="RCBrilliance Product Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductComponent products={products} />
    </div>
  );
}
