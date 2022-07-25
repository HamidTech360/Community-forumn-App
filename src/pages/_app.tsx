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
// import SlimChat from "@/components/Chat/SlimChat";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId="491147804580-d58i9u8jsblukvmvg9jan7ve2cvn0qqa.apps.googleusercontent.com">
      <head>
        <Script
          src="https://accounts.google.com/gsi/client"
          async
          defer
          strategy="beforeInteractive"
        />
      </head>
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
