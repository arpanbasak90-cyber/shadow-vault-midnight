import crypto from 'node:crypto';

/**
 * Pure helper function implementing the exact commitment formula used by ShadowVault.compact:
 * compute_commitment(key, val, blinding) = sha256(key + val + blinding)
 */
export function computeCommitment(key, val, blinding) {
  if (typeof key !== 'string' || typeof val !== 'string' || typeof blinding !== 'string') {
    throw new Error("Invalid witness parameter types");
  }
  const hash = crypto.createHash('sha256');
  hash.update(key + val + blinding);
  return hash.digest('hex');
}

/**
 * Deterministic Local Contract State Executor for ShadowVault.compact.
 * Faithfully mirrors the state variables, assertions, and circuit semantics defined in
 * src/contract/shadow_vault.compact.
 */
export class ShadowVaultLocalRuntime {
  constructor() {
    this.owner = '';
    this.commitmentCount = 0n;
    this.latestCommitment = '0'.repeat(64);
    this.isInitialized = false;
  }

  /**
   * Mirrors `export circuit initialize(initial_owner: Bytes<32>): Void`
   */
  initialize(initialOwner) {
    if (this.isInitialized) {
      throw new Error("Vault is already initialized");
    }
    if (!initialOwner || typeof initialOwner !== 'string' || initialOwner.length === 0) {
      throw new Error("Invalid owner address");
    }
    this.owner = initialOwner;
    this.commitmentCount = 0n;
    this.latestCommitment = '0'.repeat(64);
    this.isInitialized = true;
  }

  /**
   * Mirrors `export circuit store_secret_commitment(): Bytes<32>`
   */
  storeSecretCommitment(witness) {
    if (!this.isInitialized) {
      throw new Error("Vault not initialized");
    }
    if (!witness || !witness.secretKey || !witness.secretValue || !witness.blinding) {
      throw new Error("Missing required private witness fields");
    }

    const commitment = computeCommitment(witness.secretKey, witness.secretValue, witness.blinding);
    
    // DELIBERATE DISCLOSURE: update public state
    this.latestCommitment = commitment;
    this.commitmentCount += 1n;

    return commitment;
  }

  /**
   * Mirrors `export circuit verify_secret_ownership(expected_commitment: Bytes<32>): Boolean`
   */
  verifySecretOwnership(expectedCommitment, witness) {
    if (!this.isInitialized) {
      throw new Error("Vault not initialized");
    }
    if (!witness || !witness.secretKey || !witness.secretValue || !witness.blinding) {
      throw new Error("Missing required private witness fields");
    }

    const calculated = computeCommitment(witness.secretKey, witness.secretValue, witness.blinding);
    if (calculated !== expectedCommitment) {
      throw new Error("Commitment verification failed");
    }
    return true; // disclose(true)
  }
}


