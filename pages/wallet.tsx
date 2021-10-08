import React, { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { Button, Tooltip, Drawer, Typography } from "antd";
import { GlobalContext } from "../context";
import { useRouter } from "next/router";
import styles from "../styles/Wallet.module.css";
import TransactionLayout from "../components/TransactionLayout";
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { refreshBalance } from "../utils";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const Wallet: NextPage = () => {
  const { network, account, balance, setBalance } = useContext(GlobalContext);
  const [visible, setVisible] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (!account) {
      router.push("/");
      return;
    }
    refreshBalance(network, account)
      .then((updatedBalance) => {
        setBalance(updatedBalance);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [account, router, network]);

  const handleAirdrop = async () => {
    if (!account) return;

    try {
      const connection = new Connection(clusterApiUrl(network), "confirmed");
      const publicKey = account.publicKey;
      const confirmation = await connection.requestAirdrop(
        publicKey,
        LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(confirmation);
      setBalance(await refreshBalance(network, account));
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const displayAddress = (address: string) =>
    `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <>
      {account && (
        <div className={styles.wallet}>
          <h1>Dashboard</h1>

          <Paragraph copyable={{ text: account.publicKey.toString(), tooltips: `Copy` }}>
            {`Account: ${displayAddress(account.publicKey.toString())}`}
          </Paragraph>

          <p>
            Connected to{" "}
            {network === "mainnet-beta"
              ? network.charAt(0).toUpperCase() + network.slice(1, 7)
              : network.charAt(0).toUpperCase() + network.slice(1)}
          </p>
          <h2>
            {balance} <span>SOL</span>
          </h2>
          {network === "devnet" && account && (
            <>
              <Button onClick={handleAirdrop} className={styles.airdrop}>
                Airdrop
              </Button>
              <Tooltip
                title="Click to receive 1 devnet SOL into your account"
                placement={"right"}
              >
                <p className={styles.question}>?</p>
              </Tooltip>
            </>
          )}

          <Button type="primary" onClick={showModal}>
            Send <ArrowRightOutlined />
          </Button>

          <Drawer
            title="Send Funds"
            placement="bottom"
            onClose={handleClose}
            visible={visible}
            height={"45vh"}
          >
            <TransactionLayout />
          </Drawer>
        </div>
      )}
    </>
  );
};

export default Wallet;
