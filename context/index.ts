import { createContext, useContext } from "react";
import { Keypair } from "@solana/web3.js";

export type GlobalContextType = {
  network: string;
  setNetwork: (network: string) => void;
  account: Keypair | null;
  setAccount: (account: Keypair | null) => void;
  mnemonic: string;
  setMnemonic: (mnemonic: string) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  network: "Devnet",
  setNetwork: () => null,
  account: null,
  setAccount: () => null,
  mnemonic: "",
  setMnemonic: () => null,
});
export const useGlobalState = () => useContext(GlobalContext);
