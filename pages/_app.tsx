import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// @ts-ignore Could not find a declaration file for module 'react-notifications'.
import { NotificationContainer } from 'react-notifications';
import { Provider } from 'react-redux';

import Layout from '@/components/Layout/layout';
import { wrapper } from '@/stores';

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

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Layout>
        {/* <Loading /> */}
        <NotificationContainer />
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
