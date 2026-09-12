# ShadowVault — Midnight ZK Secret Store & Privacy Counter 🌑
> A zero-knowledge privacy-preserving Counter & Secret Commitment Vault smart contract and DApp built for the Midnight Network using Compact and React.

## Live Demo
[PASTE LIVE URL AFTER DEPLOYING FRONTEND — e.g. https://shadow-vault-midnight.vercel.app]

## Contract Address

| Network  | Address                                                            |
|----------|--------------------------------------------------------------------|
| Preprod  | `0x0000000000000000000000000000000000000000000000000000000000000000` |

*(Note: Hex-encoded 32-byte contract deployment address on Midnight Preprod testnet).*

---

## What This Does

ShadowVault is a privacy-preserving Web3 DApp built on the Midnight blockchain testnet. It provides two zero-knowledge smart contract primitives:
1. **Privacy Counter (`contracts/counter.compact`)**: Performs off-chain state increments via private witness inputs. Only the updated total tally is disclosed on-chain, keeping individual increment steps hidden.
2. **Secret Commitment Vault (`contracts/shadow_vault.compact`)**: Enables users to compute off-chain 256-bit cryptographic commitments of secret payload credentials and prove secret ownership on-chain without exposing private keys or raw data payload values.

---

## Privacy Model

### Counter Smart Contract (`contracts/counter.compact`)
- **What is PUBLIC:**
  - Public aggregated counter total (`counter_value`: `Uint<64>`)
  - Owner address hash (`owner`: `Bytes<32>`)
  - Initialization status (`is_initialized`: `Boolean`)
  - Disclosed state result (`disclose(new_value)`)

- **What is PRIVATE:**
  - Private increment step input (`witness get_increment_secret(): Uint<64>`)
  - Off-chain intermediate calculations before disclosure

- **What the user PROVES without revealing:**
  - The user proves off-chain knowledge of a positive increment value and valid state transition without exposing secret step inputs to network nodes.

### ShadowVault Smart Contract (`contracts/shadow_vault.compact`)
- **What is PUBLIC:**
  - Total commitment count (`commitment_count`: `Uint<64>`)
  - Latest disclosed commitment hash (`latest_commitment`: `Bytes<32>`)
  - Verification result boolean (`disclose(true)`)

- **What is PRIVATE:**
  - Secret key (`get_secret_key()`)
  - Secret payload data (`get_secret_value()`)
  - Random blinding factor (`get_blinding()`)

- **What the user PROVES without revealing:**
  - The user proves possession of exact secret keys and payload credentials matching an on-chain commitment hash without leaking raw secret text.

---

## Privacy Claim

**On-Chain Observer View vs. Hidden Private Witness:**
- An **on-chain observer or block explorer** sees ONLY public state variables (e.g. `latest_commitment = 0xa1b2c3...` and `commitment_count = 1`), state transition proof outputs (`disclose(true)`), and standard transaction metadata.
- An **on-chain observer CANNOT see** secret increment values, private keys, payload text, or blinding nonces. All private witness calculations are evaluated strictly inside the local browser / Proof Server environment.

---

## Tech Stack

- **Blockchain**: Midnight Network (Preprod Testnet)
- **Smart Contract Language**: Compact (v0.27.0+)
- **SDKs & Libraries**: Midnight.js SDK, DApp Connector API (`@midnight-ntwrk/dapp-connector-api`)
- **Frontend Framework**: React 18, Vite 5, TypeScript
- **Wallet Support**: Lace Wallet browser extension (`window.midnight.lace`)
- **Testing & Toolchain**: Node.js v22+, `tsx`, `node:assert`

---

## Prerequisites

- Node.js v22+ (`node -v`)
- Lace Wallet Browser Extension installed & set to Preprod network
- Compact compiler toolchain / Node runtime

---

## Run Locally

1. **Clone repository:**
   ```bash
   git clone https://github.com/arpanbasak90-cyber/shadow-vault-midnight.git
   cd shadow-vault-midnight
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Compile Compact smart contract:**
   ```bash
   npm run compile
   ```

4. **Run unit test suites:**
   ```bash
   npm run test:all
   ```

5. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

6. **Build production bundle:**
   ```bash
   npm run build
   ```

---

## Demo Video

[PLACEHOLDER — I will add the link after recording]
