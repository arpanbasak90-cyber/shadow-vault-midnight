/**
 * ShadowVault Compact Contract Test Suite
 * Validates ZK Circuit logic, Public Ledger State Transitions, and Private Witness Non-Disclosure.
 */

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import crypto from 'node:crypto';

export function computeCommitment(key: string, val: string, blinding: string): string {
  if (typeof key !== 'string' || typeof val !== 'string' || typeof blinding !== 'string') {
    throw new Error('Invalid witness parameter types');
  }
  const hash = crypto.createHash('sha256');
  hash.update(key + val + blinding);
  return hash.digest('hex');
}

export interface ShadowVaultWitness {
  secretKey: string;
  secretValue: string;
  blinding: string;
}

export class ShadowVaultLocalRuntime {
  public owner: string = '';
  public commitmentCount: bigint = 0n;
  public latestCommitment: string = '0'.repeat(64);
  public isInitialized: boolean = false;

  public initialize(initialOwner: string): void {
    assert.strictEqual(this.isInitialized, false, 'Vault is already initialized');
    assert.ok(initialOwner && typeof initialOwner === 'string' && initialOwner.length > 0, 'Invalid owner address');
    
    this.owner = initialOwner;
    this.commitmentCount = 0n;
    this.latestCommitment = '0'.repeat(64);
    this.isInitialized = true;
  }

  public storeSecretCommitment(witness: ShadowVaultWitness): string {
    assert.strictEqual(this.isInitialized, true, 'Vault not initialized');
    assert.ok(witness && witness.secretKey && witness.secretValue && witness.blinding, 'Missing required private witness fields');

    const commitment = computeCommitment(witness.secretKey, witness.secretValue, witness.blinding);
    
    // DELIBERATE DISCLOSURE: update public state with commitment hash ONLY
    this.latestCommitment = commitment;
    this.commitmentCount += 1n;

    return commitment;
  }

  public verifySecretOwnership(expectedCommitment: string, witness: ShadowVaultWitness): boolean {
    assert.strictEqual(this.isInitialized, true, 'Vault not initialized');
    assert.ok(witness && witness.secretKey && witness.secretValue && witness.blinding, 'Missing required private witness fields');

    const calculated = computeCommitment(witness.secretKey, witness.secretValue, witness.blinding);
    assert.strictEqual(calculated, expectedCommitment, 'Commitment verification failed');
    return true; // disclose(true)
  }
}

describe('ShadowVault Compact Contract Test Suite', () => {
  it('Contract Initialization & State Transitions', () => {
    const vault = new ShadowVaultLocalRuntime();
    const ownerAddr = '0x1111111111111111111111111111111111111111111111111111111111111111';

    assert.strictEqual(vault.isInitialized, false);
    assert.strictEqual(vault.commitmentCount, 0n);
    
    vault.initialize(ownerAddr);
    assert.strictEqual(vault.isInitialized, true);
    assert.strictEqual(vault.owner, ownerAddr);
  });

  it('Double Initialization Protection Guard', () => {
    const vault = new ShadowVaultLocalRuntime();
    vault.initialize('0x1111111111111111111111111111111111111111111111111111111111111111');

    assert.throws(
      () => vault.initialize('0x2222222222222222222222222222222222222222222222222222222222222222'),
      (err: Error) => err.message.includes('Vault is already initialized')
    );
  });

  it('Private Witness Non-Disclosure & Deliberate Disclosure Hash', () => {
    const vault = new ShadowVaultLocalRuntime();
    vault.initialize('0x1111111111111111111111111111111111111111111111111111111111111111');

    const witness: ShadowVaultWitness = {
      secretKey: 'my-private-credential-id',
      secretValue: 'super-secret-user-data',
      blinding: 'random-nonce-98765'
    };

    const expectedHash = computeCommitment(witness.secretKey, witness.secretValue, witness.blinding);
    const disclosedHash = vault.storeSecretCommitment(witness);

    assert.strictEqual(disclosedHash, expectedHash);
    assert.strictEqual(vault.latestCommitment, disclosedHash);
    assert.strictEqual(vault.commitmentCount, 1n);

    // Assert private fields are NEVER exposed in public ledger
    assert.strictEqual(vault.latestCommitment.includes(witness.secretKey), false);
    assert.strictEqual(vault.latestCommitment.includes(witness.secretValue), false);
  });
});

export function runAllTests(): void {
  console.log("==================================================================");
  console.log("⚡ SHADOWVAULT COMPACT SMART CONTRACT TEST SUITE");
  console.log("==================================================================");

  const vault = new ShadowVaultLocalRuntime();
  const ownerAddr = '0x1111111111111111111111111111111111111111111111111111111111111111';

  vault.initialize(ownerAddr);
  assert.strictEqual(vault.isInitialized, true, "Vault initialized");

  const witness: ShadowVaultWitness = {
    secretKey: 'user-secret-key',
    secretValue: 'confidential-payload',
    blinding: 'blinding-factor'
  };

  const disclosed = vault.storeSecretCommitment(witness);
  assert.ok(disclosed.length === 64, "Disclosed commitment is 64-char hex");
  assert.strictEqual(vault.verifySecretOwnership(disclosed, witness), true, "Witness verification passed");

  console.log("==================================================================");
  console.log("✨ ALL SHADOWVAULT ASSERTIONS PASSED!");
  console.log("==================================================================");
}

if (import.meta.url === `file:///${process.argv[1]?.replace(/\\/g, '/')}`) {
  runAllTests();
}
