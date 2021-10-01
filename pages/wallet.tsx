import React, { useContext } from "react";
import { NextPage } from "next";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { GlobalContext } from "../context"

const Wallet: NextPage = () => {
  const {network, account} =
    useContext(GlobalContext);

  return (
    <>
      <h1>Account Dashboard</h1>
      <p>Connected to {network}</p>
      <p>Account: {account?.publicKey.toString()}</p>
      <h2>0 <span>SOL</span></h2>
      <Button type="primary">Send <ArrowRightOutlined /></Button>
      {console.log("network at wallet:", network)}
      {console.log("account at wallet:", account)}
      {/* Maybe make the airdrop link dependent on whether there are funds in the account already? */}
      {/* Or find a way to display a message if the faucet rate limits you so user knows what's going on */}
      {network === "Devnet" && <p>Airdrop 1 SOL into Devnet account</p>}
    </>
  );
};

export default Wallet;
