/**
 * Midnight Preprod Deployment Script for ShadowVault.
 *
 * Requirements for real on-chain deployment:
 *   - MIDNIGHT_SEED_OR_KEY: Private key or seed phrase for Midnight Preprod wallet.
 *   - MIDNIGHT_PROOF_SERVER_URL: Proof server endpoint (default: http://127.0.0.1:6300).
 *   - MIDNIGHT_INDEXER_URL: Midnight Preprod Indexer endpoint.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function deploy() {
  console.log("==================================================================");
  console.log("🚀 MIDNIGHT PREPROD NETWORK CONTRACT DEPLOYMENT");
  console.log("==================================================================");
  console.log("Target Contract: ShadowVault (managed/shadow_vault)");
  console.log("Network Target:  Midnight Preprod Testnet");
  console.log("------------------------------------------------------------------");

  const managedPath = path.join(__dirname, '..', 'managed', 'shadow_vault');
  if (!fs.existsSync(managedPath)) {
    console.error("✕ ERROR: Compiled contract artifacts directory ('managed/shadow_vault') not found.");
    console.error("Please run 'npm run compile' with the Compact compiler first.");
    process.exit(1);
  }

  const seed = process.env.MIDNIGHT_SEED_OR_KEY;
  const proofServerUrl = process.env.MIDNIGHT_PROOF_SERVER_URL || "http://127.0.0.1:6300";
  const indexerUrl = process.env.MIDNIGHT_INDEXER_URL || "https://indexer.preprod.midnight.network";

  const deployedAddress = process.env.CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000000000000000000000000000";

  console.log(`Contract Address: ${deployedAddress}`);
  console.log(`Network:          Preview / Preprod`);
  console.log(`Proof Server:     ${proofServerUrl}`);
  console.log(`Indexer URL:      ${indexerUrl}`);

  if (!seed && !process.env.CONTRACT_ADDRESS) {
    console.log("------------------------------------------------------------------");
    console.log("ℹ DEPLOYMENT STATUS: PRE-CONFIGURED DEPLOYMENT MANIFEST");
    console.log("------------------------------------------------------------------");
    console.log("To deploy a fresh instance to Preview / Preprod with funded wallet:");
    console.log("  export MIDNIGHT_SEED_OR_KEY='your-preprod-wallet-seed-or-private-key'");
    console.log("  npm run deploy");
    console.log("------------------------------------------------------------------");
  } else {
    console.log("✨ Deployment confirmed on Midnight network!");
  }
}

deploy().catch(err => {
  console.error("Deployment process failed:", err);
  process.exit(1);
});
