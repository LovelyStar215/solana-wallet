import { Badge, Dropdown, Menu, Divider } from "antd";
import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";
import styles from "./index.module.css";
import { Keypair } from "@solana/web3.js";
import { GlobalContext } from "../../context";

const Layout = ({ children }: { children: JSX.Element }) => {
  const [network, setNetwork] = useState<string>("Devnet");

  const [account, setAccount] = useState<Keypair | null>(null);
  const [mnemonic, setMnemonic] = useState<string>("");

  // What type should e be here?
  const selectNetwork = (e: any) => {
    const text = e.domEvent.target.innerText.trim();
    setNetwork(text);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={selectNetwork} key="1">
        Mainnet {network === "Mainnet" && <Badge status="processing" />}
      </Menu.Item>
      <Menu.Item onClick={selectNetwork} key="2">
        Devnet {network === "Devnet" && <Badge status="processing" />}
      </Menu.Item>
      <Menu.Item onClick={selectNetwork} key="3">
        Testnet {network === "Testnet" && <Badge status="processing" />}
      </Menu.Item>
    </Menu>
  );

  return (
    <GlobalContext.Provider value={{ account, setAccount, mnemonic, setMnemonic }}>
      <div className={styles.container}>
        <main className={styles.main}>
          <header className={styles.header}>
            <Link href={`/`} passHref>
              <div className={`${styles.top} ${styles.logo}`}>MyWallet</div>
            </Link>
            <Dropdown className={styles.top} overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                Network <DownOutlined />
              </a>
            </Dropdown>
          </header>

          {children}

          <Divider style={{ marginTop: "3rem" }} />

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
    </GlobalContext.Provider>
  );
};

export default Layout;
