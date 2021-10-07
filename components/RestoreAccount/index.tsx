import React, { useState, useEffect } from "react";
import styles from "../../styles/HomeBoxes.module.css";
import { Button } from "antd";
import { LoadingOutlined, UnlockOutlined } from "@ant-design/icons";
import Link from "next/link";

const RestoreAccount = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleGetWallet = () => {
    setLoading(true);
  };

  return (
    <div className={`${styles.card} ${styles.create}`}>
      <header>
        <UnlockOutlined
          style={{ fontSize: "3rem", margin: "2rem 0", display: "block" }}
        />
        <h2>Import Wallet</h2>
        <p>
          Use your secret recovery phrase to restore an existing Solana wallet.
        </p>
      </header>

      <div className={styles.buttons}>
        {!loading && (
          <Link href={`/recover`} passHref>
            <Button onClick={handleGetWallet}>Get Existing Wallet</Button>
          </Link>
        )}
        {loading && (
          <Button className={styles.disabledButton} disabled>
            <LoadingOutlined spin />
          </Button>
        )}
      </div>
    </div>
  );
};

export default RestoreAccount;
