import Head from 'next/head';

import AboutProducts from '../components/AboutCandles';
import FeatureProducts from '../components/FeatureProducts/FeatureProducts';
import Hero from '../components/Hero/hero';

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/featureProducts');
  const data = await res.json();

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
