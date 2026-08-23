import crypto from 'crypto';

export function computeCommitment(key: string, val: string, blinding: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(key + val + blinding);
  return hash.digest('hex');
}

export class MockShadowVaultRuntime {
  public owner: string = '';
  public commitmentCount: bigint = 0n;
  public latestCommitment: string = '0'.repeat(64);
  public isInitialized: boolean = false;

  public initialize(initialOwner: string): void {
    if (this.isInitialized) {
      throw new Error("Vault is already initialized");
    }
    this.owner = initialOwner;
    this.isInitialized = true;
  }

  public storeSecretCommitment(witness: { secretKey: string; secretValue: string; blinding: string }): string {
    if (!this.isInitialized) {
      throw new Error("Vault not initialized");
    }
    const commitment = computeCommitment(witness.secretKey, witness.secretValue, witness.blinding);
    
    // Simulate disclose() - commitment becomes public ledger state
    this.latestCommitment = commitment;
    this.commitmentCount += 1n;

    return commitment;
  }

  public verifySecretOwnership(
    expectedCommitment: string,
    witness: { secretKey: string; secretValue: string; blinding: string }
  ): boolean {
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
