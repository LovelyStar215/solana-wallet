import React, { useContext } from "react";
import { NextPage } from "next";
import withPublicLayout from "../components/Layout/withPublicLayout";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { GlobalContext } from "../context"

const Wallet: NextPage = () => {
  const {network, account} =
    useContext(GlobalContext);

  return (
    <>
      <h1>Account Dashboard</h1>
      <p>Account: {account}</p>
      <h2>0 <span>SOL</span></h2>
      <Button type="primary">Send <ArrowRightOutlined /></Button>
      {console.log(network)}
      {network === "Devnet" && <p>Airdrop 1 SOL into Devnet account</p>}
    </>
  );
};

export default withPublicLayout(Wallet);
