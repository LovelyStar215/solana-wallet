import React, { useEffect, useContext, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Keypair } from "@solana/web3.js";
import * as Bip39 from "bip39";
import { Form, Input, Button } from "antd";
import { GlobalContext } from "../context";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Recover: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const { account, setAccount, setMnemonic } = useContext(GlobalContext);

  const handleImport = async (values: any) => {
    setLoading(true);
    const inputMnemonic = values.phrase.trim().toLowerCase();
    setMnemonic(inputMnemonic);
    Bip39.mnemonicToSeed(inputMnemonic)
      .then((buffer) => {
        const seed = new Uint8Array(buffer.toJSON().data.slice(0, 32));
        const importedAccount = Keypair.fromSeed(seed);
        setAccount(importedAccount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (account) {
      router.push("/wallet");
    }
  }, [account, router]);

  return (
    <>
      <RecoverTitle>Import Wallet</RecoverTitle>

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
                message: "Please enter your recovery phrase",
              },
              {
                validator(_, value) {
                  if (value.trim().split(" ").length === 12) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Recovery phrase must be 12 words long")
                  );
                },
              },
            ]}
          >
            <Input
              placeholder="Paste secret recovery phrase from clipboard"
              style={{ minWidth: "500px" }}
            />
          </Form.Item>
        </div>

        {!loading && (
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
        )}

        {loading && <LoadingOutlined style={{ fontSize: 24 }} spin />}
      </Form>
    </>
  );
};

const RecoverTitle = styled.h1`
  margin-top: 2rem;
`;

export default Recover;
