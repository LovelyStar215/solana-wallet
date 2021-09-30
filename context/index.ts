import { createContext, useContext } from "react";
import { Keypair } from "@solana/web3.js";

export type GlobalState = {
  network: string;
  account?: Keypair;
  mnemonic?: string;
};

export type GlobalContextType = {
  account: Keypair | null;
  setAccount: (account: Keypair | null) => void;
  mnemonic: string;
  setMnemonic: (mnemonic: string) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  account: null,
  setAccount: () => null,
  mnemonic: "",
  setMnemonic: () => null,
});
export const useGlobalState = () => useContext(GlobalContext);
