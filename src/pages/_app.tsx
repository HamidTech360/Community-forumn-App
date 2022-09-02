/* eslint-disable @next/next/no-script-component-in-head */
import "../styles/bootstrap.css";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Header from "../components/Organisms/Layout/Header";
import Footer from "../components/Organisms/Layout/Footer";
import AuthStatus from "@/components/Auth/AuthStatus";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Script from "next/script";
import Head from "next/head";
// import SlimChat from "@/components/Chat/SlimChat";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId="491147804580-d58i9u8jsblukvmvg9jan7ve2cvn0qqa.apps.googleusercontent.com">
      <Head>
        <Script
          src="https://accounts.google.com/gsi/client"
          async
          defer
          strategy="beforeInteractive"
        />
      </Head>
      <Provider store={store}>
        {/* Update State With Auth User If Any */}
        <AuthStatus />
        <Header />
        <div className="body pushDownNavBarBottomOnSm">
          <Component {...pageProps} />
        </div>
        <Footer />
        {/* <SlimChat /> */}
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
