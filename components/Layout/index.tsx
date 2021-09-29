import { Badge, Dropdown, Menu, Divider } from "antd";
import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";
import styles from "./index.module.css";

const Layout = ({ children }: { children: JSX.Element }) => {
  const [network, setNetwork] = useState<string>("Devnet");

  // What type should e be here?
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
  );
};

export default Layout;
