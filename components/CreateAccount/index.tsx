import React from "react";
import styles from "../../styles/HomeBoxes.module.css";
import { Button } from 'antd';

const CreateAccount = () => {
  return (
    <div className={`${styles.card} ${styles.create}`}>
      <header>
        <h2>New to MyWallet?</h2>
        <p>
          Create a new wallet to send, receive and swap Solana digital assets.
        </p>
      </header>

      <div className={styles.buttons}>
        <Button style={{borderRadius: '5px'}}>
          Create New Wallet
        </Button>
      </div>
    </div>
  );
};

export default CreateAccount;
