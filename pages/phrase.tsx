import React, { useEffect, useContext, useState } from "react";
import { NextPage } from "next";
import { Keypair } from "@solana/web3.js";
import { Button, Alert, Popconfirm } from "antd";
import * as Bip39 from "bip39";
import PhraseBox from "../components/PhraseBox";
import { GlobalContext } from "../context";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const Phrase: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const { setAccount, mnemonic, setMnemonic } = useContext(GlobalContext);

  const router = useRouter();

  useEffect(() => {
    // *Step 1*: implement a function that generates a mnemonic
    // when the page renders, and uses it to create an account
    // (a) generate a mnemonic phrase
    const generatedMnemonic = Bip39.generateMnemonic();
    // This line saves the mnemonic phrase to context state so we can display it for the wallet user to copy
    setMnemonic(generatedMnemonic);
    // (b) convert the mnemonic to seed bytes
    Bip39.mnemonicToSeed(generatedMnemonic)
      .then((bytes) => {
        // This line creates a seed typed as an array of 8-bit unsigned integers
        const seed = new Uint8Array(bytes.toJSON().data.slice(0, 32));
        // (c) use the seed to generate a new account (i.e. keypair)
        const newAccount = Keypair.fromSeed(seed);
        // This line sets the account to context state so it can be used by the app
        setAccount(newAccount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    router.push("/wallet");
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const warning =
    "Keep this phrase secret and safe. This is the only way for you to access your digital assets. Moreover, anyone can access your assets with it! Think of it as the password to your online bank account.";

  return (
    <>
      <h1 className={"title"}>Secret Recovery Phrase</h1>

      <p>
        This recovery phrase is generated with your private keys and can be used
        to recover your account.
      </p>

      <Alert message={warning} type="warning" />

      <p>
        Once you have stored this phrase somewhere safe, click finish to go to
        your wallet.
      </p>

      <PhraseBox mnemonic={mnemonic}></PhraseBox>

      {!loading && (
        <Popconfirm
          title="Did you copy the phrase?"
          visible={visible}
          onConfirm={handleOk}
          okButtonProps={{ loading: loading }}
          onCancel={handleCancel}
          cancelText={"No"}
          okText={"Yes"}
        >
          <Button type="primary" onClick={showPopconfirm}>
            Finish
          </Button>
        </Popconfirm>
      )}

      {loading && <LoadingOutlined style={{ fontSize: 24 }} spin />}
    </>
  );
};

export default Phrase;
