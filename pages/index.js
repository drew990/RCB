import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Hero from "../components/Hero/hero";
import commerce from "../lib/commerce";
import AboutProducts from "../components/AboutCandles";
import AboutMe from "../components/AboutMe";
import ContactForm from "../components/ContactForm";
import ProductList from "../components/ProductList";
// { products }
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
      <ProductList />
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
