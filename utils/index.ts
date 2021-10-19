// Import any additional classes and/or functions needed from Solana's web3.js library as you go along:
import {
  Cluster,
  Keypair,
} from "@solana/web3.js";

// *Step 3*: implement a function that gets an account's balance
const refreshBalance = async (network: Cluster, account: Keypair | null) => {
  // This line ensures the function returns before running if no account has been set
  if (!account) return 0;

  try {
    // (a) review the import guidance on line 1
    // (b) instantiate a connection using clusterApiUrl with the active network
    // Documentation References:
    //   https://solana-labs.github.io/solana-web3.js/classes/Connection.html
    //   https://solana-labs.github.io/solana-web3.js/modules.html#clusterApiUrl
    console.log("Balance functionality not implemented yet!")
    const connection = "";

    // (c) get the key using one of the accessors for active account
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

// *Step 4*: implement a function that airdrops SOL into devnet account
const handleAirdrop = async (network: Cluster, account: Keypair | null) => {
  // This line ensures the function returns before running if no account has been set
  if (!account) return;

  try {
    // (a) review the import guidance on line 1
    // (b) instantiate a connection using clusterApiUrl with the active network
    // Documentation References:
    //   https://solana-labs.github.io/solana-web3.js/classes/Connection.html
    //   https://solana-labs.github.io/solana-web3.js/modules.html#clusterApiUrl
    console.log("Airdrop functionality not implemented yet!")
    const connection = "";

    // (c) get the key using one of the accessors for active account
    // Documentation Reference: https://solana-labs.github.io/solana-web3.js/classes/Keypair.html
    const publicKey = "";

    // (d) request the airdrop using the connection instance
    // Note that you should include the amount to airdrop (consider using the LAMPORTS_PER_SOL constant from the web3.js library)
    // Documentation Reference: https://solana-labs.github.io/solana-web3.js/classes/Connection.html
    const confirmation = ""

    // (d) confirm the transaction using the connection instance and the confirmation string returned from the airdrop
    // Documentation Reference: https://solana-labs.github.io/solana-web3.js/classes/Connection.html
    const result = ""

    // (e) Refactor the refreshBalance function to return balances in SOL instead of Lamports

    // This line returns the balance after the airdrop so the UI can be refreshed
    return await refreshBalance(network, account);
  } catch (error) {
    console.log(error);
    return;
  }
};

export { refreshBalance, handleAirdrop };
