import { computeCommitment, ShadowVaultLocalRuntime } from '../src/tests/shadow_vault.test.js';

console.log("==================================================================");
console.log("⚡ MIDNIGHT SHADOW VAULT COMPACT SMART CONTRACT TEST SUITE");
console.log("==================================================================");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✕ FAIL: ${message}`);
    failed++;
  }
}

function assertThrows(fn, expectedErrorSubstring, message) {
  try {
    fn();
    console.error(`  ✕ FAIL (Expected exception but none thrown): ${message}`);
    failed++;
  } catch (err) {
    if (!expectedErrorSubstring || err.message.includes(expectedErrorSubstring)) {
      console.log(`  ✓ PASS: ${message} (Threw expected error: "${err.message}")`);
      passed++;
    } else {
      console.error(`  ✕ FAIL: ${message} (Expected "${expectedErrorSubstring}", got "${err.message}")`);
      failed++;
    }
  }
}

function runTests() {
  const vault = new ShadowVaultLocalRuntime();
  const ownerAddress = '0x1111111111111111111111111111111111111111111111111111111111111111';

  console.log("\n[Suite 1] Contract Initialization & Initial Ledger State");
  assert(vault.isInitialized === false, "Vault initially uninitialized (is_initialized == false)");
  assert(vault.commitmentCount === 0n, "Initial commitment_count is 0u64");
  assert(vault.latestCommitment === '0'.repeat(64), "Initial latest_commitment is 32-byte zero hash");
  
  vault.initialize(ownerAddress);
  assert(vault.isInitialized === true, "Vault successfully initialized (is_initialized == true)");
  assert(vault.owner === ownerAddress, "Owner address correctly stored on public ledger");

  console.log("\n[Suite 2] Rejection Case — Double Initialization Guard");
  assertThrows(() => {
    vault.initialize('0x2222222222222222222222222222222222222222222222222222222222222222');
  }, "Vault is already initialized", "Re-initialization rejected by circuit assertion 'Vault is already initialized'");

  console.log("\n[Suite 3] Private Witness Hashing & Commitment Generation (disclose)");
  const witness1 = {
    secretKey: 'user-secret-key-alpha-99',
    secretValue: 'confidential-credential-payload-123',
    blinding: 'random-blinding-factor-777'
  };

  const expectedCommitment1 = computeCommitment(witness1.secretKey, witness1.secretValue, witness1.blinding);
  const disclosedCommitment1 = vault.storeSecretCommitment(witness1);

  assert(typeof disclosedCommitment1 === 'string' && disclosedCommitment1.length === 64, "Disclosed commitment is valid 64-char hex string (32 bytes)");
  assert(disclosedCommitment1 === expectedCommitment1, "Disclosed commitment hash matches SHA256(key + val + blinding)");

  console.log("\n[Suite 4] Public Ledger State Transition & Commitment Counter");
  assert(vault.latestCommitment === disclosedCommitment1, "Public ledger latest_commitment updated to newly disclosed hash");
  assert(vault.commitmentCount === 1n, "Public ledger commitment_count incremented to 1u64");

  console.log("\n[Suite 5] Zero-Knowledge Secret Ownership Verification (Positive Case)");
  const isValidProof = vault.verifySecretOwnership(disclosedCommitment1, witness1);
  assert(isValidProof === true, "Circuit verify_secret_ownership() returns disclose(true) for matching ZK witness");

  console.log("\n[Suite 6] Rejection Case — Invalid Witness / Wrong Private Key");
  const tamperedKeyWitness = { ...witness1, secretKey: 'wrong-key-attempt' };
  assertThrows(() => {
    vault.verifySecretOwnership(disclosedCommitment1, tamperedKeyWitness);
  }, "Commitment verification failed", "verify_secret_ownership() rejects tampered secret key");

  console.log("\n[Suite 7] Rejection Case — Invalid Witness / Tampered Payload");
  const tamperedValWitness = { ...witness1, secretValue: 'tampered-payload' };
  assertThrows(() => {
    vault.verifySecretOwnership(disclosedCommitment1, tamperedValWitness);
  }, "Commitment verification failed", "verify_secret_ownership() rejects tampered payload value");

  console.log("\n[Suite 8] Rejection Case — Invalid Witness / Wrong Blinding Factor");
  const tamperedBlindingWitness = { ...witness1, blinding: 'wrong-blinding-nonce' };
  assertThrows(() => {
    vault.verifySecretOwnership(disclosedCommitment1, tamperedBlindingWitness);
  }, "Commitment verification failed", "verify_secret_ownership() rejects incorrect blinding factor");

  console.log("\n[Suite 9] Multiple Commitment Transitions & Invariant Order");
  const witness2 = {
    secretKey: 'user-secret-key-beta-100',
    secretValue: 'second-confidential-credential',
    blinding: 'second-blinding-factor-888'
  };

  const expectedCommitment2 = computeCommitment(witness2.secretKey, witness2.secretValue, witness2.blinding);
  const disclosedCommitment2 = vault.storeSecretCommitment(witness2);

  assert(disclosedCommitment2 === expectedCommitment2, "Second disclosed commitment hash matches ZK witness computation");
  assert(vault.latestCommitment === disclosedCommitment2, "Public ledger latest_commitment updated to second commitment");
  assert(vault.commitmentCount === 2n, "Public ledger commitment_count incremented to 2u64");

  console.log("\n[Suite 10] Uninitialized Contract Call Guard");
  const freshUninitializedVault = new ShadowVaultLocalRuntime();
  assertThrows(() => {
    freshUninitializedVault.storeSecretCommitment(witness1);
  }, "Vault not initialized", "store_secret_commitment() on uninitialized vault rejected");

  assertThrows(() => {
    freshUninitializedVault.verifySecretOwnership(disclosedCommitment1, witness1);
  }, "Vault not initialized", "verify_secret_ownership() on uninitialized vault rejected");

  console.log("------------------------------------------------------------------");
  console.log(`Test Execution Summary: ${passed} assertions passed, ${failed} failed.`);
  console.log("==================================================================");

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();

