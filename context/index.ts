import { createContext, useContext } from "react";
import { Keypair, Cluster } from "@solana/web3.js";

export type GlobalContextType = {
  network: Cluster;
  setNetwork: (network: Cluster) => void;
  account: Keypair | null;
  setAccount: (account: Keypair | null) => void;
  mnemonic: string;
  setMnemonic: (mnemonic: string) => void;
  balance: number;
  setBalance: (balance: number) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  network: "devnet",
  setNetwork: () => null,
  account: null,
  setAccount: () => null,
  mnemonic: "",
  setMnemonic: () => null,
  balance: 0,
  setBalance: () => null,
});

export const useGlobalState = () => useContext(GlobalContext);
