import React, { useState, useEffect } from "react";
import styles from "../../styles/HomeBoxes.module.css";
import { Button } from "antd";
import Link from "next/link";
import { BankOutlined, LoadingOutlined } from "@ant-design/icons";

const CreateAccount = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleGenerate = () => {
    setLoading(true);
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
        {!loading && (
          <Link href={`/generate`} passHref>
            <Button type="primary" onClick={handleGenerate}>
              Create New Wallet
            </Button>
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

export default CreateAccount;
