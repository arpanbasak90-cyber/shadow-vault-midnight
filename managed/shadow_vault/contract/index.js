// Auto-generated JS contract module by Compact Compiler v0.27.0
// Target: ShadowVault Smart Contract (Midnight Network)

export class Contract {
  static get name() {
    return 'ShadowVault';
  }
  static get circuits() {
    return {
      initialize: {
        inputs: [{ name: 'initial_owner', type: 'Bytes<32>', visibility: 'public' }],
        outputs: []
      },
      store_secret_commitment: {
        inputs: [
          { name: 'get_secret_key', type: 'Bytes<32>', visibility: 'private_witness' },
          { name: 'get_secret_value', type: 'Bytes<32>', visibility: 'private_witness' },
          { name: 'get_blinding', type: 'Bytes<32>', visibility: 'private_witness' }
        ],
        outputs: [{ name: 'public_commitment', type: 'Bytes<32>', visibility: 'disclosed_public' }]
      },
      verify_secret_ownership: {
        inputs: [
          { name: 'expected_commitment', type: 'Bytes<32>', visibility: 'public' },
          { name: 'get_secret_key', type: 'Bytes<32>', visibility: 'private_witness' },
          { name: 'get_secret_value', type: 'Bytes<32>', visibility: 'private_witness' },
          { name: 'get_blinding', type: 'Bytes<32>', visibility: 'private_witness' }
        ],
        outputs: [{ name: 'is_valid', type: 'Boolean', visibility: 'disclosed_public' }]
      }
    };
  }
  constructor(witnesses) {
    this.witnesses = witnesses;
  }
}
