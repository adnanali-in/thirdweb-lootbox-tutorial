import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";

// Read environment variables from .env
import dotenv from "dotenv";
dotenv.config();

const walletPrivateKey = process.env.WALLET_PRIVATE_KEY;

if (!walletPrivateKey) {
    console.error("Wallet private key missing")
    process.exit(1)
}

export const sdk = new ThirdwebSDK(
    new ethers.Wallet(
        // Wallet private key. NEVER CHECK THE KEY IN. ALWAYS USE ENVIRONMENT VARIABLES.
        process.env.WALLET_PRIVATE_KEY,
        // We use Polygon Mumbai network
        ethers.getDefaultProvider("https://winter-icy-sun.matic-testnet.quiknode.pro/f36aa318f8f806e4e15a58ab4a1b6cb9f9e9d9b9/")
    ),
);

const appAddress = '0xC4d8e0f3AfC36fbcbD45df34539881e70A05cae5'; // your project address from thirdweb

export async function getApp() {
    const app = await sdk.getAppModule(appAddress);
    return app;
}

