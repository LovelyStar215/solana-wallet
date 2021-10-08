import React from "react";
import { Typography } from "antd";
import { Box } from "../../styles/StyledComponents.styles";

const { Paragraph } = Typography;

const PhraseBox = ({ mnemonic }: { mnemonic: string }) => {
  return (
    <Box>
      <Paragraph copyable={{ text: `${mnemonic}`, tooltips: `Copy` }}>
        {mnemonic}
      </Paragraph>
    </Box>
  );
};

export default PhraseBox;
