# ShadowVault — Privacy-Preserving Key-Value Store & Secret Commitment Vault 🌑

> A zero-knowledge confidential data vault and credential eligibility verifier smart contract built for Midnight Network using the Compact language and TypeScript SDK.

## Contract Address

| Network  | Address                                                            |
|----------|--------------------------------------------------------------------|
| Preview  | 0x0000000000000000000000000000000000000000000000000000000000000000 |
| Preprod  | 0x0000000000000000000000000000000000000000000000000000000000000000 |

*(Note: Replace placeholder address with live transaction address once deployed via wallet seed.)*

---

## What This Does

ShadowVault allows users to store cryptographic commitments of confidential credentials (keys, secret values, and random blinding factors) on the Midnight blockchain. It enables users to prove ownership or eligibility of a private credential off-chain without revealing the raw secret key, payload data, or blinding nonce on the public ledger.

---

## Privacy Model

- **What is PUBLIC (on-chain, visible to anyone):**
  - Contract owner address (`owner`: `Bytes<32>`)
  - Incremental count of stored commitments (`commitment_count`: `Uint<64>`)
  - Disclosed 256-bit SHA256 commitment hash (`latest_commitment`: `Bytes<32>`)
  - Initialization status (`is_initialized`: `Boolean`)
  - Boolean ZK proof execution output (`disclose(true)`)

- **What is PRIVATE (private witness, never on-chain):**
  - Private credential key (`get_secret_key()`)
  - Private secret payload value (`get_secret_value()`)
  - Off-chain random blinding factor (`get_blinding()`)
  - Intermediate circuit calculation inputs

- **What the user PROVES without revealing:**
  - The user proves off-chain knowledge of the exact `secretKey`, `secretValue`, and `blinding` factor that produces a specific on-chain commitment hash, without ever revealing the underlying secret key or value to any node or observer.

---

## Tech Stack

- **Blockchain Platform:** Midnight Network (Preview / Preprod)
- **Smart Contract Language:** Compact (v0.27.0+)
- **Runtime & Environment:** Node.js v22+, Docker (for proof server)
- **Frontend & Toolchain:** TypeScript, Vite, React, tsx

---

## Prerequisites

Before running this project locally, ensure you have the following installed:

1. **Node.js v22+** (`node -v`)
2. **Docker Desktop** (for running `midnightnetwork/proof-server:latest`)
3. **Compact Compiler Toolchain** (`@midnight-ntwrk/compact-compiler` or `compact`)
4. **Git** (`git --version`)

---

## Setup

Follow these steps to set up and build the project locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/arpanbasak90-cyber/shadow-vault-midnight.git
   cd shadow-vault-midnight
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Midnight Proof Server (Docker):**
   ```bash
   docker run -p 6300:6300 midnightnetwork/proof-server:latest
   ```

4. **Verify Compact Compiler & Build ZK Artifacts:**
   ```bash
   npm run compile
   ```
   *Generated ZK circuit artifacts will be output to `managed/shadow_vault/` and `managed/counter/`.*

5. **Deploy to Preview / Preprod Network:**
   ```bash
   export MIDNIGHT_SEED_OR_KEY="your-wallet-seed-phrase"
   npm run deploy
   ```

---

## Run Tests

Run the complete automated Compact contract test suite covering circuit logic, state transitions, and private witness protection:

```bash
npm test
```

To run the secondary Counter contract test suite:
```bash
npm run test:counter
```

---

## Initial Idea

[LEAVE PLACEHOLDER — I will fill this in manually]

---

## Screenshots

[LEAVE PLACEHOLDER — I will add compile output and contract address screenshots]

---

## Submission & Requirements Checklist

- [x] Contract compiles via `compact compile` / `npm run compile`
- [x] Generated `managed/` directory present with valid ZK circuits (`.zkir`) and keys (`.pk`, `.vk`, `index.ts`)
- [x] 3+ tests passing with explicit assertions in `tests/shadow_vault.test.ts` & `tests/counter.test.ts`
- [x] Contract deployment setup ready for Preview / Preprod in `scripts/deploy.js`
- [x] Contract address table visible in `README.md`
- [x] `README.md` formatted with all required sections
- [x] Standard folder structure matching Level 1 spec (`contracts/`, `managed/`, `tests/`, `.github/`, `README.md`)
