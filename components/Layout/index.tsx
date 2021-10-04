import { Badge, Dropdown, Menu, Divider } from "antd";
import React, { useContext } from "react";
import {
  DownOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import styles from "./index.module.css";
import { GlobalContext } from "../../context";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: JSX.Element }) => {
  const { network, setNetwork, account } = useContext(GlobalContext);

  const router = useRouter();

  // What type should `e` be here?
  const selectNetwork = (e: any) => {
    const text = e.domEvent.target.innerText.trim().toLowerCase();
    if (text === "mainnet") {
      setNetwork("mainnet-beta");
    } else {
      setNetwork(text);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={selectNetwork} key="1">
        Mainnet {network === "mainnet-beta" && <Badge status="processing" />}
      </Menu.Item>
      <Menu.Item onClick={selectNetwork} key="2">
        Devnet {network === "devnet" && <Badge status="processing" />}
      </Menu.Item>
      <Menu.Item onClick={selectNetwork} key="3">
        Testnet {network === "testnet" && <Badge status="processing" />}
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

          <Menu
            mode="horizontal"
            className={styles.nav}
            selectedKeys={[router.pathname]}
          >
            {account && (
              <Menu.Item key="/wallet" icon={<UserOutlined />}>
                <Link href="/wallet" passHref>
                  Wallet
                </Link>
              </Menu.Item>
            )}
            <Dropdown className={styles.top} overlay={menu} disabled={!account}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                Network <DownOutlined />
              </a>
            </Dropdown>
          </Menu>
        </header>

        {children}

        {router.pathname !== "/" && (
          <Link href="/" passHref>
            <a className={styles.back}>
              <ArrowLeftOutlined /> Back Home
            </a>
          </Link>
        )}

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
