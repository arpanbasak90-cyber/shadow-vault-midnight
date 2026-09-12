// Auto-generated JS contract module by Compact Compiler v0.27.0
// Target: Counter Smart Contract (Midnight Network)

export class Contract {
  static get name() {
    return 'Counter';
  }
  static get circuits() {
    return {
      initialize: {
        inputs: [{ name: 'initial_owner', type: 'Bytes<32>', visibility: 'public' }],
        outputs: []
      },
      increment: {
        inputs: [{ name: 'secret_step', type: 'Uint<64>', visibility: 'private_witness' }],
        outputs: [{ name: 'counter_value', type: 'Uint<64>', visibility: 'disclosed_public' }]
      }
    };
  }
  constructor(witnesses) {
    this.witnesses = witnesses;
  }
}
