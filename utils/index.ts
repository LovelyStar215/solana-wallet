import { Cluster, clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { message } from "antd";

const refreshBalance = async (
  network: Cluster | undefined,
  account: Keypair | null
) => {
  // This line ensures the function returns before running if no account has been set
  if (!account) return 0;

  try {
    const connection = new Connection(clusterApiUrl(network), "confirmed");

    // get the key using one of the accessors on the account passed in as an argument
    const publicKey = account.publicKey;

    // get the account's balance using the connection instance
    const balance = await connection.getBalance(publicKey);

    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    message.error(`Balance refresh failed: ${errorMessage}`);
    return 0;
  }
};

// *Step 4*: implement a function that airdrops SOL into devnet account
const handleAirdrop = async (network: Cluster, account: Keypair | null) => {
  // This line ensures the function returns before running if no account has been set
  if (!account) return;

  try {
    const connection = new Connection(clusterApiUrl(network), "confirmed");

    // get the key using one of the accessors on the account passed in as an argument
    const publicKey = account.publicKey;

    // request the airdrop using the connection instance
    const confirmation = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);

    // confirm the transaction using the connection instance and the confirmation string returned from the airdrop
    const result = await connection.confirmTransaction(confirmation, "confirmed");

    // (e) Refactor the refreshBalance function to return balances in SOL instead of Lamports (Hint: LAMPORTS_PER_SOL)

    // This line returns the balance after the airdrop so the UI can be refreshed
    return await refreshBalance(network, account);
    // (f) You can now delete the console.log statement since the function is implemented!
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    message.error(`Airdrop failed: ${errorMessage}`);
  }
};

export { refreshBalance, handleAirdrop };
