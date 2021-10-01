import React, { useEffect, useContext } from "react";
import { NextPage } from "next";
import { useRouter } from 'next/router'
import { Keypair } from "@solana/web3.js";
import withPublicLayout from "../components/Layout/withPublicLayout";
import styles from "../styles/Phrase.module.css";
import * as Bip39 from "bip39";
import { Form, Input, Button } from "antd";
import { GlobalContext } from "../context"

const Recover: NextPage = () => {
  const [form] = Form.useForm();
  const router = useRouter()

  const {account, setAccount, setMnemonic} =
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

  useEffect(() => {
    console.log("account at import:", account)
    if (account) {
      router.push('/wallet')
    }
  }, [account])

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
            rules={[
              {
                required: true,
                message: 'Please enter your recovery phrase',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value.trim().split(" ").length === 12) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Recovery phrase must be 12 words long'));
                },
              }),
            ]}
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
