import React, { useState } from "react";
import { Keypair } from "@solana/web3.js";
import styles from "../../styles/HomeBoxes.module.css";
import { Button } from "antd";

const CreateAccount = () => {
  const [keypair, setKeypair] = useState<Keypair | null>(null);

  const handleCreate = () => {
    const keypair = new Keypair();
    setKeypair(keypair);
  };

  return (
    <div className={`${styles.card} ${styles.create}`}>
      <header>
        <h2>New to MyWallet?</h2>
        <p>
          Create a new wallet to send, receive and swap Solana digital assets.
        </p>
      </header>

      <div className={styles.buttons}>
        <Button type="primary" onClick={handleCreate}>
          Create New Wallet
        </Button>
      </div>
    </div>
  );
};

export default CreateAccount;
