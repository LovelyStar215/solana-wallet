import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Menu, Dropdown, Badge } from "antd";
import { DownOutlined } from "@ant-design/icons";
import CreateAccount from "../components/CreateAccount";
import RestoreAccount from "../components/RestoreAccount";
import { useState } from "react";

const Home: NextPage = () => {
  const [network, setNetwork] = useState<string>("Devnet");

  const selectNetwork = (e: any) => {
    const text = e.domEvent.target.innerText.trim();
    setNetwork(text);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={selectNetwork}>
        Mainnet {network === "Mainnet" && <Badge status="processing" />}
      </Menu.Item>
      <Menu.Item onClick={selectNetwork}>
        Devnet {network === "Devnet" && <Badge status="processing" />}
      </Menu.Item>
      <Menu.Item onClick={selectNetwork}>
        Testnet {network === "Testnet" && <Badge status="processing" />}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Wallet Tutorial</title>
        <meta
          name="description"
          content="Solana wallet tutorial by Figment Learn"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* Consider abstracting into separate header component */}
        <header className={styles.header}>
          <div className={`${styles.top} ${styles.logo}`}>MyWallet</div>
          <Dropdown className={styles.top} overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Network <DownOutlined />
            </a>
          </Dropdown>
        </header>

        <h1 className={styles.title}>
          A simple, non-custodial crypto wallet for managing{" "}
          <a href="https://solana.com/">Solana</a> digital assets.
        </h1>

        <div className={styles.grid}>
          <CreateAccount></CreateAccount>
          <RestoreAccount></RestoreAccount>
        </div>

        <footer className={styles.footerHome}>
          <p>
            MyWallet tutorial created by{" "}
            <a className={styles.footerLink} href="https://learn.figment.io/">
              Figment Learn
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Home;
