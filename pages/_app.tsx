import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// @ts-ignore Could not find a declaration file for module 'react-notifications'.
import { NotificationContainer } from 'react-notifications';

import Layout from '@/components/Layout/layout';

// function Loading() {
// const router = useRouter();
// const [loading, setLoading] = useState(false);
// useEffect(() => {
//   const handleStart = (url) =>
//     url !== router.asPath && setLoading(true) && console.log(url);
//   const handleComplete = (url) => url === router.asPath && setLoading(false);
//   router.events.on('routeChangeStart', handleStart);
//   router.events.on('routeChangeComplete', handleComplete);
//   router.events.on('routeChangeError', handleComplete);

//   return () => {
//     router.events.off('routeChangeStart', handleStart);
//     router.events.off('routeChangeComplete', handleComplete);
//     router.events.off('routeChangeError', handleComplete);
//   };
// });

//   return (
//     loading && (
//       <div>
//         <h1>{loading}Loading...</h1>
//       </div>
//     )
//   );
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      {/* <Loading /> */}
      <NotificationContainer />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
