import React from "react";
import styles from "../../styles/HomeBoxes.module.css";
import { Button } from "antd";
import { DownloadOutlined, UnlockOutlined } from "@ant-design/icons";
import Link from "next/link";

const RestoreAccount = () => {
  return (
    <div className={`${styles.card} ${styles.create}`}>
      <header>
        {/* <DownloadOutlined /> */}
        <UnlockOutlined
          style={{ fontSize: "3rem", margin: "2rem 0", display: "block" }}
        />
        <h2>Import Wallet</h2>
        <p>
          Use your secret recovery phrase to restore an existing Solana wallet.
        </p>
      </header>

      <div className={styles.buttons}>
        <Link href={`/recover`} passHref>
          <Button>Get Existing Wallet</Button>
        </Link>
      </div>
    </div>
  );
};

export default RestoreAccount;
