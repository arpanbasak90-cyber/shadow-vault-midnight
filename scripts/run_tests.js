/**
 * Genuine Midnight Contract Integration Test Suite Runner
 * 
 * Runs counter.test.ts and shadow_vault.test.ts using tsx & node test runner.
 */

import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runIntegrationTests() {
  console.log("==================================================================");
  console.log("⚡ MIDNIGHT CONTRACT GENUINE INTEGRATION TEST SUITE");
  console.log("==================================================================");

  try {
    console.log("\n[Executing Counter Contract Integration Tests]");
    execSync('npx tsx tests/counter.test.ts', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

    console.log("\n[Executing ShadowVault Contract Integration Tests]");
    execSync('npx tsx tests/shadow_vault.test.ts', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

    console.log("\n------------------------------------------------------------------");
    console.log("✨ ALL MIDNIGHT CONTRACT INTEGRATION TESTS PASSED SUCCESSFULLY!");
    console.log("==================================================================");
  } catch (err) {
    console.error("\n✕ Integration test execution failed:", err.message);
    process.exit(1);
  }
}

runIntegrationTests();
