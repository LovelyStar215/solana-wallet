import {
  Connection,
  Cluster,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  Keypair,
} from "@solana/web3.js";

// *Step 2*: implement a function that gets an account's balance 
const refreshBalance = async (network: Cluster, account: Keypair | null) => {
  // (a) instantiate a connection using clusterApiUrl with the active network
  const connection = new Connection(clusterApiUrl(network), "confirmed");
  // (b) get the key from the active account
  const publicKey = account?.publicKey;
  if (publicKey) {
    // (c) get the account's balance from the connection instance
    const balance = await connection.getBalance(publicKey);
    // (d) return the balance in SOL
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
