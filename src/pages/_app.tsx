import "../styles/bootstrap.css";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Header from "../components/Organisms/Layout/Header";
import Footer from "../components/Organisms/Layout/Footer";
import { ApolloProvider } from "@apollo/client";
import client from "../utils/apollo-client";
import { AuthProvider } from "../hooks/useAuth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Header />
        <div className="body">
          <Component {...pageProps} />
        </div>
        <Footer />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
