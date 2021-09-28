import React, { useState } from "react";
import { Keypair } from "@solana/web3.js";
import styles from "../../styles/HomeBoxes.module.css";
import { Button } from "antd";
import Link from "next/link";
import { BankOutlined } from "@ant-design/icons";

const CreateAccount = () => {
  const [keypair, setKeypair] = useState<Keypair | null>(null);

  const handleCreate = () => {
    const keypair = new Keypair();
    setKeypair(keypair);
  };

  return (
    <div className={`${styles.card} ${styles.create}`}>
      <header>
        <BankOutlined
          style={{ fontSize: "3rem", margin: "2rem 0", display: "block" }}
        />
        <h2>New to MyWallet?</h2>
        <p>
          Create a new wallet to send, receive and swap Solana digital assets.
        </p>
      </header>

      <div className={styles.buttons}>
        <Link href={`/wallet`} passHref>
          <Button type="primary" onClick={handleCreate}>
            Create New Wallet
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateAccount;
