import React, { useState } from "react";
import { NextPage } from "next";
import styles from "../styles/Phrase.module.css";
import { Button, Spin } from "antd";
import Link from "next/link";
import { LoadingOutlined } from "@ant-design/icons";

const Phrase: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoading = () => {
    setLoading(true)
  };

  return (
    <>
      <h1 className={styles.title}>Create New Wallet</h1>

      <p>Generate a key phrase to setup your Solana wallet.</p>

      {!loading && (
        <Link href={`/phrase`} passHref>
          <Button type="default" onClick={handleLoading}>
            Generate
          </Button>
        </Link>
      )}

      {loading && <LoadingOutlined style={{ fontSize: 24 }} spin />}
    </>
  );
};

export default Phrase;
