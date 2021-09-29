import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Keypair } from "@solana/web3.js";
import withPublicLayout from "../components/Layout/withPublicLayout";
import styles from "../styles/Phrase.module.css";
import { Button } from "antd";
import * as Bip39 from "bip39";
import PhraseBox from "../components/PhraseBox";

const Phrase: NextPage = () => {
  // Replace this with global state since recover.tsx uses it also
  const [account, setAccount] = useState<Keypair | null>(null);
  const [mnemonic, setMnemonic] = useState<string>("");

  useEffect(() => {
    const mnemonic = Bip39.generateMnemonic();
    // const mnemonic = "image birth recipe fade maximum maximum rifle pledge there forward subway pistol"
    setMnemonic(mnemonic);
    console.log(mnemonic);
    Bip39.mnemonicToSeed(mnemonic)
      .then((buffer) => {
        const seed = new Uint8Array(buffer.toJSON().data.slice(0, 32));
        const account = Keypair.fromSeed(seed);
        setAccount(account);
        console.log(account);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

      <PhraseBox mnemonic={mnemonic}></PhraseBox>

      <p>
        Once you have stored this phrase somewhere safe, click finish to go to
        your wallet.
      </p>

      <Button type="primary">Finish</Button>
    </>
  );
};

export default withPublicLayout(Phrase);
