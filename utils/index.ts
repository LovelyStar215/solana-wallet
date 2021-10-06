import {
  Connection,
  Cluster,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  Keypair,
} from "@solana/web3.js";

const refreshBalance = async (network: Cluster, account: Keypair) => {
  const connection = new Connection(clusterApiUrl(network), "confirmed");
  const publicKey = account?.publicKey;
  if (publicKey) {
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  }
};

export { refreshBalance };
