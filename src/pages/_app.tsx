/* eslint-disable react/jsx-key */
import "../styles/bootstrap.css";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Header from "../components/Organisms/Layout/Header";
import Footer from "../components/Organisms/Layout/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <div className="body">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
