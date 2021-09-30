import React, { useContext } from "react";
import { NextPage } from "next";
import { Keypair } from "@solana/web3.js";
import withPublicLayout from "../components/Layout/withPublicLayout";
import styles from "../styles/Phrase.module.css";
import * as Bip39 from "bip39";
import { Form, Input, Button } from "antd";
import { GlobalContext } from "../context"

const Recover: NextPage = () => {
  const [form] = Form.useForm();

  const {account, setAccount, mnemonic, setMnemonic} =
    useContext(GlobalContext);

  const handleImport = async (values: any) => {
    setMnemonic(values.phrase)
    Bip39.mnemonicToSeed(values.phrase)
      .then((buffer) => {
        const seed = new Uint8Array(buffer.toJSON().data.slice(0, 32));
        const importedAccount = Keypair.fromSeed(seed);
        setAccount(importedAccount);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <h1 className={styles.title}>Import Wallet</h1>

      <p>Enter your secret recovery phrase here to restore your wallet.</p>

      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
        onFinish={handleImport}
      >
        <div style={{ overflow: "hidden" }}>
          <Form.Item
            name="phrase"
            label="Secret Recovery Phrase"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Paste secret recovery phrase from clipboard"
              style={{ minWidth: "500px" }}
            />
          </Form.Item>
        </div>
        <Form.Item shouldUpdate className="submit">
          {() => (
            <Button
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length > 0
              }
            >
              Import
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default withPublicLayout(Recover);
