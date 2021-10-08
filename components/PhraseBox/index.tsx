import React from "react";
import { Typography } from "antd";

const { Paragraph } = Typography;

const PhraseBox = ({ mnemonic }: { mnemonic: string }) => {
  return (
    <div className={"box"}>
      <Paragraph copyable={{ text: `${mnemonic}`, tooltips: `Copy` }}>
        {mnemonic}
      </Paragraph>
    </div>
  );
};

export default PhraseBox;
