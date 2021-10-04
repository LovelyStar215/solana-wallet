import React, { useContext, useEffect } from "react";
import { NextPage } from "next";
import { Button } from "antd";
import { GlobalContext } from "../context";
import { useRouter } from "next/router";
import styles from "../styles/Wallet.module.css";
import TransactionModal from "../components/TransactionModal";

const Wallet: NextPage = () => {
  const { network, account } = useContext(GlobalContext);

  const router = useRouter();

  useEffect(() => {
    if (!account) {
      router.push("/");
    }
  }, [account, router]);

  return (
    <>
      {account && (
        <div className={styles.wallet}>
          <h1>Account Dashboard</h1>
          <p>Connected to {network}</p>
          <p>Account: {account?.publicKey.toString()}</p>
          <h2>
            0 <span>SOL</span>
          </h2>
          <TransactionModal />
        </div>
      )}
      {/* Maybe make the airdrop link dependent on whether there are funds in the account already? */}
      {/* Or find a way to display a message if the faucet rate limits you so user knows what's going on */}
      {network === "Devnet" && account && (
        <p>Airdrop 1 SOL into Devnet account</p>
      )}
    </>
  );
};

export default Wallet;
