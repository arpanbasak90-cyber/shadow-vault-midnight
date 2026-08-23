const crypto = require('crypto');

function computeCommitment(key, val, blinding) {
  const hash = crypto.createHash('sha256');
  hash.update(key + val + blinding);
  return hash.digest('hex');
}

class MockShadowVaultRuntime {
  constructor() {
    this.owner = '';
    this.commitmentCount = 0n;
    this.latestCommitment = '0'.repeat(64);
    this.isInitialized = false;
  }

  initialize(initialOwner) {
    if (this.isInitialized) {
      throw new Error("Vault is already initialized");
    }
    this.owner = initialOwner;
    this.isInitialized = true;
  }

  storeSecretCommitment(witness) {
    if (!this.isInitialized) {
      throw new Error("Vault not initialized");
    }
    const commitment = computeCommitment(witness.secretKey, witness.secretValue, witness.blinding);
    
    // Simulate disclose() - commitment becomes public ledger state
    this.latestCommitment = commitment;
    this.commitmentCount += 1n;

    return commitment;
  }

  verifySecretOwnership(expectedCommitment, witness) {
    if (!this.isInitialized) {
      throw new Error("Vault not initialized");
    }
    const calculated = computeCommitment(witness.secretKey, witness.secretValue, witness.blinding);
    if (calculated !== expectedCommitment) {
      throw new Error("Commitment verification failed");
    }
    return true; // disclose(true)
  }
}

module.exports = {
  computeCommitment,
  MockShadowVaultRuntime
};
