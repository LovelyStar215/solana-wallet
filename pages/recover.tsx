import React, { useState } from "react";
import { NextPage } from "next";
import { Keypair } from "@solana/web3.js";
import withPublicLayout from "../components/Layout/withPublicLayout";
import styles from "../styles/Phrase.module.css";
import * as Bip39 from "bip39";
import { Form, Input, Button } from "antd";

const Recover: NextPage = () => {
  const [form] = Form.useForm();

  // Replace this with global state since phrase.tsx uses it also
  const [account, setAccount] = useState<Keypair | null>(null);

  const handleImport = async (values: any) => {
    Bip39.mnemonicToSeed(values.phrase)
      .then((buffer) => {
        const seed = new Uint8Array(buffer.toJSON().data.slice(0, 32));
        const account = Keypair.fromSeed(seed);
        setAccount(account);
        console.log(account);
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
