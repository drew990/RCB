import Head from 'next/head';
import React from 'react';

import ProductComponent from '../components/Products/Products';

export const getStaticProps = async () => {
  const res = await fetch('www.rcbrilliance.com/api/productsSqu');
  const data = await res.json();

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
