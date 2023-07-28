import Head from 'next/head';
import React from 'react';
import { CatalogObject } from 'square';

import { createSquareClient } from '@/lib/square';

import ProductComponent from '../components/Products/Products';

export const getServerSideProps = async () => {
  try {
    // Create the square client
    const client = createSquareClient();
    // Get all "ITEM" objects from the square catalog
    const { result: productsResult } = await client.catalogApi.listCatalog(
      undefined,
      'ITEM'
    );

    // Do not continue if we do not have any "ITEM" objects.
    const products = productsResult.objects ?? [];
    if (products.length === 0) {
      return { props: { products: [] } };
    }

    // Get all image URLs for the "ITEM" objects
    const productImageIds = products
      .map(({ itemData }) => itemData?.imageIds?.[0] ?? '')
      .filter(Boolean);
    // Get all "IMAGE" objects from the square catalog
    const { result: productImageResult } =
      await client.catalogApi.batchRetrieveCatalogObjects({
        objectIds: productImageIds,
      });

    // Map the data into the following structure: [[Product, Image], ...]
    const productImages = productImageResult?.objects ?? [];
    const results = products.map((product) => [
      product,
      productImages.find(({ id }) => id === product.itemData?.imageIds?.[0]),
    ]);
    return {
      props: { products: results },
    };
  } catch (error) {
    console.log('Unexpected error occurred: ', error);
    return {
      props: { products: [] },
    };
  }
};

export default function Products({
  products,
}: {
  products: Array<[CatalogObject, CatalogObject]>;
}) {
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
