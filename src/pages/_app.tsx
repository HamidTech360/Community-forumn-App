import "../styles/bootstrap.css";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Header from "../components/Organisms/Layout/Header";
import Footer from "../components/Organisms/Layout/Footer";
import AuthStatus from "@/components/Auth/AuthStatus";
// import SlimChat from "@/components/Chat/SlimChat";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
    </>
  );
}

export default MyApp;
