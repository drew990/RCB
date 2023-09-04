import Head from 'next/head';
import React from 'react';

import ProductComponent from '@/components/Products';
import { wrapper } from '@/stores';
import { fetchCatalog } from '@/stores/slices/catalog';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchCatalog({ include: ['IMAGE'] }));

    return { props: {} };
  }
);

export default function Products() {
  return (
    <div>
      <Head>
        <title>RCBrilliance - Products</title>
        <meta name="description" content="RCBrilliance Product Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductComponent />
    </div>
  );
}
