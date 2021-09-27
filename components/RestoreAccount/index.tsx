import React from "react";
import styles from "../../styles/HomeBoxes.module.css";
import { Button } from 'antd';

const RestoreAccount = () => {
  return (
    <div className={`${styles.card} ${styles.create}`}>
      <header>
        <h2>Import Wallet!</h2>
        <p>
          Use your secret recovery phrase to restore an existing Solana wallet.
        </p>
      </header>

      <div className={styles.buttons}>
        <Button>
          Get Existing Wallet
        </Button>
      </div>
    </div>
  );
};

export default RestoreAccount;
