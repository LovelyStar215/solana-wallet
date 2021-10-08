import {
  Connection,
  Cluster,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  Keypair,
} from "@solana/web3.js";

const refreshBalance = async (network: Cluster, account: Keypair | null) => {
  const connection = new Connection(clusterApiUrl(network), "confirmed");
  const publicKey = account?.publicKey;
  if (publicKey) {
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } else {
    return 0;
  }
};

const handleAirdrop = async (network: Cluster, account: Keypair | null) => {
  if (!account) return;

  try {
    const connection = new Connection(clusterApiUrl(network), "confirmed");
    const publicKey = account.publicKey;
    const confirmation = await connection.requestAirdrop(
      publicKey,
      LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(confirmation);
    return await refreshBalance(network, account);
  } catch (error) {
    console.log(error);
    return;
  }
};

export { refreshBalance, handleAirdrop };
