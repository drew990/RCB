import Head from 'next/head';

import { wrapper } from '@/stores';
import { fetchCatalogObjects } from '@/stores/slices/catalog';
import { FEATURED_PRODUCTS_IDS } from '@/utils/constants';

import AboutProducts from '../components/AboutCandles';
import FeatureProducts from '../components/FeaturedProducts';
import Hero from '../components/Hero/hero';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(
      fetchCatalogObjects({
        ids: FEATURED_PRODUCTS_IDS,
        includeRelatedObjects: true,
      })
    );

    return { props: {} };
  }
);

export default function Home() {
  return (
    <>
      <Head>
        <title>RCBrilliance - Home</title>
        <meta name="description" content="RCBrilliance Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <AboutProducts />
      <FeatureProducts />
    </>
  );
}
