import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Hero from "../components/Hero/hero";
import commerce from "../lib/commerce";
import AboutProducts from "../components/AboutCandles";
import AboutMe from "../components/AboutMe";
import ContactForm from "../components/ContactForm";
import Products from "../components/Products/Products";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/productsSqu");
  const data = await res.json();

  return {
    props: { products: data },
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
      <Products products={products} />
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
