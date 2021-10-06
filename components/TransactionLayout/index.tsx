import React, { useState, useContext } from "react";
import { Input, Button } from "antd";
import { GlobalContext } from "../../context";
import {
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import styled from "styled-components";
const converter = require("number-to-words");
import { LoadingOutlined } from "@ant-design/icons";

// TODOS
// - add date
// - style the inputs
// - convert amount to string (28 => "twenty eight")
// - change the $ and DOLLARS
// - add from field
// - move all width from px to %

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
  const { network, account } = useContext(GlobalContext);
  const [form, setForm] = useState<FormT>(defaultForm);
  const [sending, setSending] = useState<boolean>(false);

  const onFieldChange = (field, value) => {
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

    console.log("hash", hash);
  };

  return (
    <>
      <CheckContainer>
        <CheckImage
          src="/how-to-write-a-check-cropped.jpeg"
          alt="Check"
          height="335"
          width="800"
        />
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
  width: 800px;
  margin-top: 50px;
  position: relative;
`;

const CheckImage = styled.img`
  width: 100%;
`;

const RecipientInput = styled(Input)`
  position: absolute;
  top: 35%;
  left: 17%;
  height: 30px;
  width: 300px;
`;

const AmountInput = styled(Input)`
  position: absolute;
  top: 35%;
  left: 76%;
  height: 30px;
  width: 100px;
`;

const SignatureInput = styled(Button)`
  position: absolute;
  top: 69%;
  left: 59%;
  height: 30px;
  width: 250px;
`;

const AmountText = styled.p`
  position: absolute;
  top: 52%;
  left: 5%;
`;

export default TransactionModal;
