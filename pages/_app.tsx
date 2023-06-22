import '@/styles/globals.css';

import type { AppProps } from 'next/app';
// @ts-ignore Could not find a declaration file for module 'react-notifications'.
import { NotificationContainer } from 'react-notifications';

import Layout from '@/components/Layout/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <NotificationContainer />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
