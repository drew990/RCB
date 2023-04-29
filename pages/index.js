import Head from "next/head";

import ComingSoon from "../components/ComingSoon";
// { products }
export default function Home() {
  return (
    <>
      <Head>
        <title>RCBrilliance - Home</title>
        <meta
          name="description"
          content="RCBrilliance - All my candles are made with care and love"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ComingSoon />
      {/* <Hero />
      <AboutProducts />
      <ProductList /> */}
    </>
  );
}

// export async function getStaticProps() {
//   const merchant = await commerce.merchants.about();
//   const { data: categories } = await commerce.categories.list();
//   const { data: products } = await commerce.products.list();

//   return {
//     props: { merchant, categories, products },
//   };
// }
