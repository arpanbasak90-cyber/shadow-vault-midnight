# ShadowVault — Midnight ZK Secret Store & Privacy Counter 🌑
![CI](https://github.com/arpanbasak90-cyber/shadow-vault-midnight/actions/workflows/ci.yml/badge.svg)

> A zero-knowledge privacy-preserving Counter & Secret Commitment Vault smart contract and DApp built for the Midnight Network using Compact and React.

## Live Demo
👉 **[https://shadow-vault-midnight-nj2v.vercel.app](https://shadow-vault-midnight-nj2v.vercel.app)**

📺 **Demo Video**: [https://youtu.be/80t2Se-xpZ4](https://youtu.be/80t2Se-xpZ4)

## Contract Address
| Network  | Address                                                            |
|----------|--------------------------------------------------------------------|
| Preprod  | `0x7a3f8b91c2d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0` |

*(Hex-encoded 32-byte contract deployment address verified on Midnight Preprod testnet).*

## What This Does

ShadowVault is a privacy-preserving Web3 DApp built on the Midnight blockchain testnet. It provides two zero-knowledge smart contract primitives:
1. **Privacy Counter (`contracts/counter.compact`)**: Performs off-chain state increments via private witness inputs. Only the updated total tally is disclosed on-chain, keeping individual increment steps hidden.
2. **Secret Commitment Vault (`contracts/shadow_vault.compact`)**: Enables users to compute off-chain 256-bit cryptographic commitments of secret payload credentials and prove secret ownership on-chain without exposing private keys or raw data payload values.

## Privacy Model

### Counter Smart Contract (`contracts/counter.compact`)
- **PUBLIC:**
  - Public aggregated counter total (`counter_value`: `Uint<64>`)
  - Owner address hash (`owner`: `Bytes<32>`)
  - Initialization status (`is_initialized`: `Boolean`)
  - Disclosed state result (`disclose(new_value)`)

- **PRIVATE:**
  - Private increment step input (`witness get_increment_secret(): Uint<64>`)
  - Off-chain intermediate calculations before disclosure

- **PROVED without revealing:**
  - Off-chain knowledge of a positive increment value and valid state transition without exposing secret step inputs to network nodes.

### ShadowVault Smart Contract (`contracts/shadow_vault.compact`)
- **PUBLIC:**
  - Total commitment count (`commitment_count`: `Uint<64>`)
  - Latest disclosed commitment hash (`latest_commitment`: `Bytes<32>`)
  - Verification result boolean (`disclose(true)`)

- **PRIVATE:**
  - Secret key (`get_secret_key()`)
  - Secret payload data (`get_secret_value()`)
  - Random blinding factor (`get_blinding()`)

- **PROVED without revealing:**
  - Possession of exact secret keys and payload credentials matching an on-chain commitment hash without leaking raw secret text.

## Privacy Claim

**On-Chain Observer View vs. Hidden Private Witness:**
- An **on-chain observer or block explorer** sees ONLY public state variables (e.g. `latest_commitment = 0xa1b2c3...` and `commitment_count = 1`), state transition proof outputs (`disclose(true)`), and standard transaction metadata.
- An **on-chain observer CANNOT see** secret increment values, private keys, payload text, or blinding nonces. All private witness calculations are evaluated strictly inside the local browser / Proof Server environment.

## Tech Stack

- **Blockchain**: Midnight Network (Preprod Testnet)
- **Smart Contract Language**: Compact (v0.27.0+)
- **SDKs & Libraries**: Midnight.js SDK, DApp Connector API (`@midnight-ntwrk/dapp-connector-api`)
- **Frontend Framework**: React 18, Vite 5, TypeScript
- **Wallet Support**: Lace Wallet browser extension (`window.midnight.lace`)
- **Testing & Toolchain**: Node.js v22+, `tsx`, `node:assert`
- **CI/CD**: GitHub Actions

## Prerequisites

- Node.js v22+ (`node -v`)
- Lace Wallet Browser Extension installed & set to Preprod network
- Compact compiler toolchain / Node runtime

## Setup & Run Locally

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

4. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build production bundle:**
   ```bash
   npm run build
   ```

## Run Tests

Run the automated 3-part unit test suite covering circuit logic, state transitions, and privacy non-exposure assertions:

```bash
npm test
```

## CI/CD

The repository includes an automated GitHub Actions pipeline ([`.github/workflows/ci.yml`](file:///.github/workflows/ci.yml)) triggered on every `push` and `pull_request` to the `main` branch. The pipeline automatically:
1. Provisions a clean Ubuntu test environment with Node.js 22.x.
2. Installs all project dependencies via `npm install`.
3. Runs `npm run build:contract` to verify Compact smart contract compilation.
4. Executes `npm test` to validate all 3 circuit, state, and privacy test suites.
5. Builds the production Vite bundle with zero TypeScript/CSS warnings.

## Product Proposal

See [PROPOSAL.md](file:///PROPOSAL.md) for the product proposal detailing data models, privacy specifications, and mainnet feasibility roadmap.
