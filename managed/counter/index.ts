// Auto-generated TypeScript bindings by Compact Compiler v0.27.0
export interface CounterLedgerState {
  counter_value: bigint;
  owner: Uint8Array;
  is_initialized: boolean;
}

export interface CounterWitness {
  get_increment_secret(): bigint;
}

export interface CounterContract {
  initialize(initial_owner: Uint8Array): Promise<void>;
  increment(witness: CounterWitness): Promise<bigint>;
}

export const CONTRACT_NAME = "Counter";
export const CIRCUIT_HASH = "8a21f7e34b9012a832c94d673bf82105c93a8e104b7b2190c427d140129a7583";
