import React, { useContext, useEffect } from "react";
import { NextPage } from "next";
import { Button } from "antd";
import { GlobalContext } from "../context";
import { useRouter } from "next/router";
import styles from "../styles/Wallet.module.css";
import TransactionModal from "../components/TransactionModal";
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
  Cluster,
} from "@solana/web3.js";

const Wallet: NextPage = () => {
  const { network, account, balance, setBalance } = useContext(GlobalContext);

  const router = useRouter();

  useEffect(() => {
    if (!account) {
      router.push("/");
    }
  }, [account, router]);

  // useEffect(() => {
  //   console.log("Hello, the network changed!")
  // }, [network])

  const handleAirdrop = async () => {
    try {
      const connection = new Connection(clusterApiUrl(network), "confirmed");
      const publicKey = account?.publicKey;
      const transaction = await connection.requestAirdrop(
        publicKey,
        LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(transaction);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {account && (
        <div className={styles.wallet}>
          <h1>Account Dashboard</h1>
          <p>Connected to {
              network === "mainnet-beta" ?
                network.charAt(0).toUpperCase() + network.slice(1,7) :
                network.charAt(0).toUpperCase() + network.slice(1)
            }
          </p>
          <p>Account: {account?.publicKey.toString()}</p>
          <h2>
            {balance} <span>SOL</span>
          </h2>
          <TransactionModal />
        </div>
      )}
      {/* Maybe make the airdrop link dependent on whether there are funds in the account already? */}
      {/* Or find a way to display a message if the faucet rate limits you so user knows what's going on */}
      {network === "devnet" && account && (
        <p onClick={handleAirdrop}>Airdrop 1 SOL into Devnet account</p>
      )}
    </>
  );
};

export default Wallet;
