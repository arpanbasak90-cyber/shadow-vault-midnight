// Auto-generated TypeScript definitions by Compact Compiler v0.27.0
// Target: Counter Smart Contract (Midnight Network)

export interface CounterLedgerState {
  readonly counter_value: bigint;
  readonly owner: Uint8Array;
  readonly is_initialized: boolean;
}

export interface CounterWitnesses {
  get_increment_secret(): bigint;
}

export declare class Contract {
  readonly name: string;
  constructor(witnesses: CounterWitnesses);
  initialize(initial_owner: Uint8Array): Promise<void>;
  increment(): Promise<bigint>;
}
