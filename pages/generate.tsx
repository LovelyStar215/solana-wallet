import { NextPage } from "next";
import styles from "../styles/Phrase.module.css";
import { Button } from "antd";
import Link from "next/link";

const Phrase: NextPage = () => {
  return (
    <>
      <h1 className={styles.title}>Create New Wallet</h1>

      <p>Generate a key phrase to setup your Solana wallet.</p>

      <Link href={`/phrase`} passHref>
        <Button type="default">Generate</Button>
      </Link>
    </>
  );
};

export default Phrase;
