import { MockShadowVaultRuntime, computeCommitment } from './shadow_vault.test';

describe('ShadowVault Compact Smart Contract Test Suite', () => {
  let vault: MockShadowVaultRuntime;
  const ownerAddress = '0x1111111111111111111111111111111111111111111111111111111111111111';

  beforeEach(() => {
    vault = new MockShadowVaultRuntime();
  });

  test('1. Should initialize vault with public owner and zero state', () => {
    expect(vault.isInitialized).toBe(false);
    vault.initialize(ownerAddress);
    
    expect(vault.isInitialized).toBe(true);
    expect(vault.owner).toBe(ownerAddress);
    expect(vault.commitmentCount).toBe(0n);
  });

  test('2. Should reject re-initialization', () => {
    vault.initialize(ownerAddress);
    expect(() => vault.initialize(ownerAddress)).toThrow("Vault is already initialized");
  });

  test('3. Should store secret commitment using private witness and update public ledger state', () => {
    vault.initialize(ownerAddress);

    const witness = {
      secretKey: 'my-private-api-key-123',
      secretValue: 'super-secret-user-data-payload',
      blinding: 'random-blinding-nonce-999'
    };

    const expectedHash = computeCommitment(witness.secretKey, witness.secretValue, witness.blinding);
    const disclosedHash = vault.storeSecretCommitment(witness);

    expect(disclosedHash).toBe(expectedHash);
    expect(vault.latestCommitment).toBe(expectedHash);
    expect(vault.commitmentCount).toBe(1n);
  });

  test('4. Should verify secret ownership with valid witness against public commitment', () => {
    vault.initialize(ownerAddress);

    const witness = {
      secretKey: 'user-ssn-hash-secret',
      secretValue: 'verified-status-true',
      blinding: 'random-nonce-456'
    };

    const targetCommitment = vault.storeSecretCommitment(witness);
    const isValid = vault.verifySecretOwnership(targetCommitment, witness);

    expect(isValid).toBe(true);
  });

  test('5. Should fail verification if witness does not match stored commitment', () => {
    vault.initialize(ownerAddress);

    const validWitness = {
      secretKey: 'correct-secret-key',
      secretValue: 'correct-payload',
      blinding: 'correct-nonce'
    };

    const fakeWitness = {
      secretKey: 'wrong-secret-key',
      secretValue: 'correct-payload',
      blinding: 'correct-nonce'
    };

    const targetCommitment = vault.storeSecretCommitment(validWitness);
    expect(() => vault.verifySecretOwnership(targetCommitment, fakeWitness)).toThrow("Commitment verification failed");
  });
});
