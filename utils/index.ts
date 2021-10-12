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

// *Step 3*: implement a function that airdrops SOL into devnet account
const handleAirdrop = async (network: Cluster, account: Keypair | null) => {
  // This line ensures the function returns before running if no account has been set
  if (!account) return;

  try {
    // (a) instantiate a connection using clusterApiUrl with the active network
    const connection = new Connection(clusterApiUrl(network), "confirmed");
    // (b) get the key from the active account
    const publicKey = account.publicKey;
    // (c) request the airdrop using the connection instance
    const confirmation = await connection.requestAirdrop(
      publicKey,
      LAMPORTS_PER_SOL
    );
    // (d) confirm the transaction using the connection instance
    await connection.confirmTransaction(confirmation);
    // This line returns the balance after the airdrop so the UI can be refreshed
    return await refreshBalance(network, account);
  } catch (error) {
    console.log(error);
    return;
  }
};

export { refreshBalance, handleAirdrop };
