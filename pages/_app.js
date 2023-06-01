import "../styles/globals.css";
import Layout from "../components/Layout/layout";
import { NotificationContainer } from "react-notifications";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <NotificationContainer />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
