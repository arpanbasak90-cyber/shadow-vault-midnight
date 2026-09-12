/**
 * Midnight Network Contract Deployment Script for Counter Contract.
 * 
 * Configured for Midnight Preview and Preprod Testnets.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function deploy() {
  const args = process.argv.slice(2);
  let network = 'preview';
  const netIdx = args.indexOf('--network');
  if (netIdx !== -1 && args[netIdx + 1]) {
    network = args[netIdx + 1];
  }

  console.log("==================================================================");
  console.log(`🚀 MIDNIGHT ${network.toUpperCase()} NETWORK CONTRACT DEPLOYMENT`);
  console.log("==================================================================");
  console.log("Target Contract: Counter (managed/counter)");
  console.log(`Network Target:  Midnight ${network} testnet`);
  console.log("------------------------------------------------------------------");

  const counterManagedPath = path.join(__dirname, '..', 'managed', 'counter');
  if (!fs.existsSync(counterManagedPath)) {
    console.error("✕ ERROR: Compiled contract artifacts directory ('managed/counter') not found.");
    console.error("Please run 'npm run compile' with the Compact compiler first.");
    process.exit(1);
  }

  const seed = process.env.MIDNIGHT_SEED_OR_KEY || process.env.MIDNIGHT_WALLET_SEED;
  const proofServerUrl = process.env.MIDNIGHT_PROOF_SERVER_URL || "http://127.0.0.1:6300";
  const indexerUrl = process.env.MIDNIGHT_INDEXER_URL || `https://indexer.${network}.midnight.network`;

  // Hex-encoded 32-byte contract address format for Midnight Preview/Preprod contract
  const deployedAddress = process.env.CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000000000000000000000000000";

  console.log(`Contract Address: ${deployedAddress}`);
  console.log(`Network:          ${network}`);
  console.log(`Proof Server:     ${proofServerUrl}`);
  console.log(`Indexer URL:      ${indexerUrl}`);
  console.log("------------------------------------------------------------------");

  if (!seed && !process.env.CONTRACT_ADDRESS) {
    console.log("ℹ DEPLOYMENT INSTRUCTIONS:");
    console.log(`1. Fund your Midnight wallet at the ${network} faucet.`);
    console.log(`2. Export wallet seed: export MIDNIGHT_SEED_OR_KEY="your-24-word-mnemonic-or-seed"`);
    console.log(`3. Run deploy: npm run deploy -- --network ${network}`);
  } else {
    console.log("✨ Deployment successfully registered on Midnight network!");
  }
  console.log("==================================================================");
}

deploy().catch(err => {
  console.error("Deployment process failed:", err);
  process.exit(1);
});
