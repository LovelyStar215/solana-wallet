import { NextPage } from "next";
import withPublicLayout from "../components/Layout/withPublicLayout";
import { Button } from "antd";
import { ToTopOutlined } from "@ant-design/icons";

const Wallet: NextPage = () => {
  return (
    <>
      <h1>Account Dashboard</h1>
      <p>Account: adasdasasdasdasdsdsas</p>
      <h2>0 <span>SOL</span></h2>
      <Button type="primary">Send <ToTopOutlined /></Button>
    </>
  );
};

export default withPublicLayout(Wallet);
