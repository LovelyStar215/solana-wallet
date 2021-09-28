import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Keypair } from "@solana/web3.js";
import withPublicLayout from "../components/Layout/withPublicLayout";
import styles from "../styles/Phrase.module.css";
import { Button } from "antd";

const Phrase: NextPage = () => {
  const [keypair, setKeypair] = useState<Keypair | null>(null);

  useEffect(() => {
    const account = new Keypair();
    setKeypair(account);
    console.log(account.publicKey.toBase58());
    console.log(account.secretKey);
  }, [])

  return (
    <>
      <h1 className={styles.title}>Secret Recovery Phrase</h1>

      <p>
        This recovery phrase is generated with your private keys and can be used
        to recover your account.
      </p>

      <p>
        Keep this phrase secret and safe. This is the only way for you to access
        digital assets. Moreover, anyone can access your assets with it! Think
        of it as the password to your online bank account.
      </p>

      <div className={styles.grid}>Phrase</div>

      <p>
        Once you have stored this phrase somewhere safe, click finish to go to
        your wallet.
      </p>

      <Button type="primary">Finish</Button>
    </>
  );
};

export default withPublicLayout(Phrase);
