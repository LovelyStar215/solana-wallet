import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import CreateAccount from "../components/CreateAccount";
import RestoreAccount from "../components/RestoreAccount";
import React from "react";
import withPublicLayout from "../components/Layout/withPublicLayout";

const Home: NextPage = () => {
  return (
    <>
      <h1 className={styles.title}>
        A simple, non-custodial crypto wallet for managing{" "}
        <a href="https://solana.com/">Solana</a> digital assets.
      </h1>

      <div className={styles.grid}>
        <CreateAccount></CreateAccount>
        <RestoreAccount></RestoreAccount>
      </div>
    </>
  )
};

export default withPublicLayout(Home);
