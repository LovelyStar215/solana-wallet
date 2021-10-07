import React, { useState, useContext } from "react";
import { Input, Button } from "antd";
import { GlobalContext } from "../../context";
import {
  Connection,
  clusterApiUrl,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import styled from "styled-components";
const converter = require("number-to-words");
import { LoadingOutlined } from "@ant-design/icons";
import { refreshBalance } from "../../utils";

// TODOS
// - style the inputs
// - check balance after transaction
// - handle insufficient funds error

type FormT = {
  from: string;
  to: string;
  amount: number;
  isSigned: boolean;
};

const defaultForm: FormT = {
  from: "",
  to: "",
  amount: 0,
  isSigned: false,
};

const TransactionModal = () => {
  const { network, account, setBalance } = useContext(GlobalContext);
  const [form, setForm] = useState<FormT>(defaultForm);
  const [sending, setSending] = useState<boolean>(false);

  const onFieldChange = (field: string, value: string | number) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const transfer = async () => {
    if (!account) return;
    const connection = new Connection(clusterApiUrl(network), "confirmed");

    const instructions = SystemProgram.transfer({
      fromPubkey: account.publicKey,
      toPubkey: new PublicKey(form.to),
      lamports: form.amount,
    });

    const signers = [
      {
        publicKey: account.publicKey,
        secretKey: account.secretKey,
      },
    ];

    const transaction = new Transaction().add(instructions);

    setSending(true);

    const hash = await sendAndConfirmTransaction(
      connection,
      transaction,
      signers
    );

    setSending(false);

    setBalance(await refreshBalance(network, account))
    console.log("hash", hash);
  };

  return (
    <>
      <CheckContainer>
        <CheckImage
          src="/how-to-write-a-check-cropped.jpeg"
          alt="Check"
          
        />
        <CheckFrom>{`FROM: ${account?.publicKey}`}</CheckFrom>
        <CheckDate>
          {new Date().toString().split(' ').slice(1,4).join(" ")}
        </CheckDate>
        <RecipientInput
          value={form.to}
          onChange={(e) => onFieldChange("to", e.target.value)}
        />
        <AmountInput
          value={form.amount}
          onChange={(e) => onFieldChange("amount", e.target.value)}
        />
        <AmountText>
          {form.amount <= 0 ? "" : converter.toWords(form.amount)}
        </AmountText>
        {sending ? (
          <LoadingOutlined
            style={{
              fontSize: 24,
              position: "absolute",
              top: "69%",
              left: "73%",
            }}
            spin
          />
        ) : (
          <SignatureInput onClick={transfer}>Sign and Send</SignatureInput>
        )}
      </CheckContainer>
    </>
  );
};

const CheckContainer = styled.div`
  width: 77%;
  margin-top: 3rem;
  position: relative;
`;

const CheckImage = styled.img`
  width: 100%;
`;

const CheckFrom = styled.p`
  position: absolute;
  top: 11%;
  left: 3.6%;
`;

const CheckDate = styled.p`
  position: absolute;
  top: 20%;
  left: 68%;
`;

const RecipientInput = styled(Input)`
  position: absolute;
  top: 35%;
  left: 17%;
  height: 9%;
  width: 50%;
`;

const AmountInput = styled(Input)`
  position: absolute;
  top: 35%;
  left: 76%;
  height: 9%;
  width: 15%;
`;

const SignatureInput = styled(Button)`
  position: absolute;
  top: 69%;
  left: 59%;
  height: 9%;
  width: 32.5%;
`;

const AmountText = styled.p`
  position: absolute;
  top: 52%;
  left: 5%;
`;

export default TransactionModal;
