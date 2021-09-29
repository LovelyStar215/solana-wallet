import React from "react";
import styles from "../../styles/Phrase.module.css";
import { notification, Tooltip } from 'antd';


const PhraseBox = ({ mnemonic }) => {
  const copyMnemonic = (e) => {
    const mnemonicText = e.target.innerText;
    navigator.clipboard.writeText(mnemonicText)

    notification.open({
      message: 'Phrase Copied',
      description:
        'Remember to store this somewhere safe!',
    });
  };

  return (
    <Tooltip title="click to copy">
      <div className={styles.box} id="mnemonic" onClick={copyMnemonic}>
        {mnemonic}
      </div>
    </Tooltip>
  );
};

export default PhraseBox;
