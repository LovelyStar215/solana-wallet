import React, { useState, useContext } from "react";
import { Input, Button, message } from "antd";
import { GlobalContext } from "../../context";
import {
  Connection,
  clusterApiUrl,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import styled from "styled-components";
const converter = require("number-to-words");
import { LoadingOutlined } from "@ant-design/icons";
import { refreshBalance } from "../../utils";

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
  const { network, account, balance, setBalance } = useContext(GlobalContext);
  const [form, setForm] = useState<FormT>(defaultForm);
  const [sending, setSending] = useState<boolean>(false);
  const [transactionSig, setTransactionSig] = useState<string>("");

  const onFieldChange = (field: string, value: string) => {
    if (field === "amount" && !!value.match(/\D+/)) {
      console.log(value);
      return;
    }

    setForm({
      ...form,
      [field]: value,
    });
  };

  const transfer = async () => {
    if (!account) return;

    const connection = new Connection(clusterApiUrl(network), "confirmed");

    try {
      setTransactionSig("");

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

      const confirmation = await sendAndConfirmTransaction(
        connection,
        transaction,
        signers
      );

      setTransactionSig(confirmation);

      setSending(false);

      setBalance(await refreshBalance(network, account));
      message.success(`Transaction confirmed`);
      console.log(confirmation);
    } catch (error) {
      console.log(error);
      message.error(
        "Transaction failed, please check your inputs and try again"
      );
    }
  };

  return (
    <>
      <CheckContainer>
        <CheckImage src="/check.jpeg" alt="Check" />
        <CheckFrom>{`FROM: ${account?.publicKey}`}</CheckFrom>

        {transactionSig && (
          <Processed
            href={`https://explorer.solana.com/tx/${transactionSig}?cluster=devnet`}
            target="_blank"
          >
            Processed - Review on Solana Block Explorer
          </Processed>
        )}

        <CheckDate>
          {new Date().toString().split(" ").slice(1, 4).join(" ")}
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
          <SignatureInput
            onClick={transfer}
            disabled={
              form.amount / LAMPORTS_PER_SOL > balance ||
              !form.to ||
              form.amount == 0
            }
            type="primary"
          >
            Sign and Send
          </SignatureInput>
        )}
        <RatioText>1 $SOL = 1,000,000,000 $L</RatioText>
      </CheckContainer>
    </>
  );
};

const CheckContainer = styled.div`
  width: 77%;
  margin: auto;
  position: relative;
  max-width: 750px;
`;

const CheckImage = styled.img`
  width: 100%;
`;

const CheckFrom = styled.p`
  position: absolute;
  top: 11%;
  left: 3.6%;
`;

const Processed = styled.a`
  position: absolute;
  top: 20%;
  left: 3.6%;
  font-style: italic;
  color: #dc1fff;
`;

const CheckDate = styled.p`
  position: absolute;
  top: 19%;
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

const RatioText = styled.p`
  position: absolute;
  top: 71%;
  left: 11%;
`;

export default TransactionModal;
