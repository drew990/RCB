import Head from 'next/head';

import AboutProducts from '../components/AboutCandles';
import FeatureProducts from '../components/FeatureProducts/FeatureProducts';
import Hero from '../components/Hero/hero';
import { loadFeatureProducts } from '../lib/LoadFeatureProducts';

export const getServerSideProps = async () => {
  const data = await loadFeatureProducts();

  return {
    props: {
      products: data,
    },
  };
};

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>RCBrilliance - Home</title>
        <meta name="description" content="RCBrilliance Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <AboutProducts />
      <FeatureProducts products={products} />
    </>
  );
}
