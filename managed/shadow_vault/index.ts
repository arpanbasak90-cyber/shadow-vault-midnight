// Auto-generated TypeScript bindings by Compact Compiler v0.27.0
export interface ShadowVaultLedgerState {
  owner: Uint8Array;
  commitment_count: bigint;
  latest_commitment: Uint8Array;
  is_initialized: boolean;
}

export interface ShadowVaultWitness {
  get_secret_key(): Uint8Array;
  get_secret_value(): Uint8Array;
  get_blinding(): Uint8Array;
}

export interface ShadowVaultContract {
  initialize(initial_owner: Uint8Array): Promise<void>;
  store_secret_commitment(witness: ShadowVaultWitness): Promise<Uint8Array>;
  verify_secret_ownership(expected_commitment: Uint8Array, witness: ShadowVaultWitness): Promise<boolean>;
}

export const CONTRACT_NAME = "ShadowVault";
export const CIRCUIT_HASH = "ed33dae0de709c64eb7961ca6b11a45668669a1c23fe9abf4b77188155c9650c";
