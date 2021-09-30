import { createContext, useContext } from "react";
import { Keypair } from "@solana/web3.js";

export type GlobalState = {
  network: string;
  account?: Keypair;
  mnemonic?: string;
};

export type GlobalContextType = {
  network: string;
  account: Keypair | null;
  setAccount: (account: Keypair | null) => void;
  mnemonic: string;
  setMnemonic: (mnemonic: string) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  network: "Devnet",
  account: null,
  setAccount: () => null,
  mnemonic: "",
  setMnemonic: () => null,
});
export const useGlobalState = () => useContext(GlobalContext);
