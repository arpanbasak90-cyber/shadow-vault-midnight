# Midnight Counter & ShadowVault Smart Contracts 🌑

> A zero-knowledge privacy-preserving Counter & Secret Commitment Vault smart contract built for the Midnight Network using the Compact language.

## Contract Address

| Network  | Address                                                            |
|----------|--------------------------------------------------------------------|
| Preview  | 0x0000000000000000000000000000000000000000000000000000000000000000 |
| Preprod  | 0x0000000000000000000000000000000000000000000000000000000000000000 |

*(Note: Address updated upon live deployment to Preview/Preprod testnet).*

---

## What This Does

This project implements privacy-preserving smart contracts on the Midnight blockchain using the Compact domain-specific language (DSL).

1. **Counter Contract (`contracts/counter.compact`)**: Allows state transitions where the increment step value is provided off-chain via a private witness. Only the final aggregated counter total is disclosed to the public ledger, while individual step values remain unexposed.
2. **ShadowVault Contract (`contracts/shadow_vault.compact`)**: Enables users to compute and store 256-bit cryptographic commitments of secret data and verify ownership off-chain without exposing secret keys or payload data.

---

## Privacy Model

### Counter Contract (`contracts/counter.compact`)
- **What is PUBLIC (on-chain, visible to anyone):**
  - Public counter tally (`counter_value`: `Uint<64>`)
  - Owner address hash (`owner`: `Bytes<32>`)
  - Initialization status (`is_initialized`: `Boolean`)
  - Disclosed final count calculation (`disclose(new_value)`)

- **What is PRIVATE (private witness, never on-chain):**
  - Private increment step input (`witness get_increment_secret(): Uint<64>`)
  - Off-chain calculation steps prior to disclosure

- **What the user PROVES without revealing:**
  - The user proves they hold a valid positive increment value and correctly update the state without revealing the secret step value to external observers or network nodes.

### ShadowVault Contract (`contracts/shadow_vault.compact`)
- **What is PUBLIC (on-chain, visible to anyone):**
  - Contract owner address (`owner`: `Bytes<32>`)
  - Commitment counter (`commitment_count`: `Uint<64>`)
  - Latest 256-bit commitment hash (`latest_commitment`: `Bytes<32>`)
  - Boolean proof verification result (`disclose(true)`)

- **What is PRIVATE (private witness, never on-chain):**
  - Private key (`get_secret_key()`)
  - Private payload value (`get_secret_value()`)
  - Off-chain random blinding factor (`get_blinding()`)

- **What the user PROVES without revealing:**
  - The user proves off-chain knowledge of the exact secret key, value, and blinding factor that generate an on-chain commitment hash without exposing raw secrets.

---

## Tech Stack

- Midnight network, Compact language (v0.27.0+), Node.js v22+, Docker (for proof server), TypeScript, tsx

---

## Prerequisites

- Node.js v22+ (`node -v`)
- Docker Desktop (for running `midnightnetwork/proof-server:latest`)
- Compact Compiler Toolchain (`compact` / `@midnight-ntwrk/compact-compiler`)
- Git (`git --version`)

---

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arpanbasak90-cyber/shadow-vault-midnight.git
   cd shadow-vault-midnight
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Pull and run the Midnight Proof Server:**
   ```bash
   docker pull midnightnetwork/proof-server
   docker run -p 6300:6300 midnightnetwork/proof-server
   ```

4. **Compile the Compact contract and generate ZK artifacts:**
   ```bash
   compact compile contracts/counter.compact managed/counter
   # or via npm runner script:
   npm run compile
   ```

5. **Deploy contract to Preview or Preprod network:**
   ```bash
   export MIDNIGHT_SEED_OR_KEY="your-wallet-seed-phrase"
   npm run deploy -- --network preview
   ```

---

## Run Tests

Run the mandatory Counter contract test suite (covers circuit logic, state transitions, and private input non-exposure):

```bash
npm test
```

Run all contract test suites:

```bash
npm run test:all
```

---

## Initial Idea

[LEAVE PLACEHOLDER — I will fill this in manually]

---

## Screenshots

[LEAVE PLACEHOLDER — I will add compile output and contract address screenshots]

---

## Submission Checklist (Level 1)

- [x] Contract compiles via `compact compile` / `npm run compile`
- [x] `managed/` directory present with circuits, ZKIR, and keys
- [x] 3+ tests passing with explicit `node:assert` assertions
- [x] Contract deploy script ready for Preview / Preprod in `scripts/deploy.js`
- [x] Contract address table visible in `README.md`
- [x] `README.md` formatted with all required sections
- [x] Project file structure matches Level 1 spec
