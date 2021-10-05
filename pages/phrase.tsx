import React, { useEffect, useContext, useState } from "react";
import { NextPage } from "next";
import { Keypair } from "@solana/web3.js";
import styles from "../styles/Phrase.module.css";
import { Button } from "antd";
import * as Bip39 from "bip39";
import PhraseBox from "../components/PhraseBox";
import { GlobalContext } from "../context";
import Link from "next/link";
import { LoadingOutlined } from "@ant-design/icons";

const Phrase: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAccount, mnemonic, setMnemonic } = useContext(GlobalContext);

  useEffect(() => {
    const generatedMnemonic = Bip39.generateMnemonic();
    setMnemonic(generatedMnemonic);
    Bip39.mnemonicToSeed(generatedMnemonic)
      .then((buffer) => {
        const seed = new Uint8Array(buffer.toJSON().data.slice(0, 32));
        const newAccount = Keypair.fromSeed(seed);
        setAccount(newAccount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLoading = () => {
    setLoading(true);
  };

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

      {!loading && (
        <Link href={`/wallet`} passHref>
          <Button type="primary" onClick={handleLoading}>
            Finish
          </Button>
        </Link>
      )}

      {loading && <LoadingOutlined style={{ fontSize: 24 }} spin />}
    </>
  );
};

export default Phrase;
