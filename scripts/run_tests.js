const { computeCommitment, MockShadowVaultRuntime } = require('../src/tests/shadow_vault.test');

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

function runTests() {
  const vault = new MockShadowVaultRuntime();
  const ownerAddress = '0x1111111111111111111111111111111111111111111111111111111111111111';

  console.log("\n[Suite 1] Contract Initialization & Ledger State");
  assert(vault.isInitialized === false, "Vault initially uninitialized");
  vault.initialize(ownerAddress);
  assert(vault.isInitialized === true, "Vault successfully initialized");
  assert(vault.owner === ownerAddress, "Owner public key set on ledger");
  assert(vault.commitmentCount === 0n, "Commitment count initialized to 0");

  console.log("\n[Suite 2] Private Witness & Commitment Generation (disclose)");
  const witness = {
    secretKey: 'my-private-api-key-123',
    secretValue: 'super-secret-user-data-payload',
    blinding: 'random-blinding-nonce-999'
  };
  const expectedHash = computeCommitment(witness.secretKey, witness.secretValue, witness.blinding);
  const disclosedHash = vault.storeSecretCommitment(witness);

  assert(disclosedHash === expectedHash, "Disclosed commitment hash matches ZK witness output");
  assert(vault.latestCommitment === expectedHash, "Public ledger updated with disclosed commitment hash");
  assert(vault.commitmentCount === 1n, "Commitment count incremented to 1");

  console.log("\n[Suite 3] Zero-Knowledge Secret Ownership Verification");
  const isValid = vault.verifySecretOwnership(disclosedHash, witness);
  assert(isValid === true, "ZK Proof verified ownership without revealing raw secret key or payload");

  console.log("\n[Suite 4] Security & Constraint Bounds");
  const fakeWitness = {
    secretKey: 'wrong-secret-key',
    secretValue: 'super-secret-user-data-payload',
    blinding: 'random-blinding-nonce-999'
  };
  let threwError = false;
  try {
    vault.verifySecretOwnership(disclosedHash, fakeWitness);
  } catch (e) {
    threwError = true;
  }
  assert(threwError === true, "Invalid witness correctly rejected by ZK circuit constraint");

  console.log("------------------------------------------------------------------");
  console.log(`Summary: ${passed} passed, ${failed} failed.`);
  console.log("==================================================================");

  if (failed > 0) process.exit(1);
}

runTests();
