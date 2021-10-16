// Import any additional classes and/or functions needed from Solana's web3.js library:
import {
  Cluster,
  Keypair,
} from "@solana/web3.js";

// *Step 3*: implement a function that gets an account's balance
const refreshBalance = async (network: Cluster, account: Keypair | null) => {
  if (!account) return 0;

  try {
    // (a) review the import guidance on line 1
    // (b) instantiate a connection using clusterApiUrl with the active network
    // Documentation References:
    //   https://solana-labs.github.io/solana-web3.js/classes/Connection.html
    //   https://solana-labs.github.io/solana-web3.js/modules.html#clusterApiUrl
    console.log("Balance functionality not implemented yet!")
    const connection = "";

    // (c) get the key using one of the accesors for active account
    // Documentation Reference: https://solana-labs.github.io/solana-web3.js/classes/Keypair.html
    const publicKey = "";

    // (d) get the account's balance using the connection instance
    // Documentation Reference: https://solana-labs.github.io/solana-web3.js/classes/Connection.html
    const balance = 0

    return balance
  } catch (error) {
    console.log(error);
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
    console.log("Airdrop functionality not implemented yet!")
    // const connection = "";
    // (b) get the key from the active account
    const publicKey = account.publicKey;
    // const publicKey = "";
    // (c) request the airdrop using the connection instance
    // const confirmation = ""
    const confirmation = await connection.requestAirdrop(
      publicKey,
      LAMPORTS_PER_SOL
    );
    // (d) confirm the transaction using the connection instance
    console.log(confirmation)
    const result = await connection.confirmTransaction(confirmation, "confirmed");
    console.log("result: ", result)
    // This line returns the balance after the airdrop so the UI can be refreshed
    return await refreshBalance(network, account);
  } catch (error) {
    console.log(error);
    return;
  }
};

export { refreshBalance, handleAirdrop };
