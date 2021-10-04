import React, { useState } from "react";
import { Keypair } from "@solana/web3.js";
import 'antd/dist/antd.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GlobalContext } from "../context";
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const [network, setNetwork] = useState<string>("devnet");
  const [account, setAccount] = useState<Keypair | null>(null);
  const [mnemonic, setMnemonic] = useState<string>("");

  return (
    <GlobalContext.Provider value={{ network, setNetwork, account, setAccount, mnemonic, setMnemonic }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContext.Provider>
  )
}
export default MyApp
