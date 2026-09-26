# ShadowVault — Midnight ZK Secret Store & Privacy Counter 🌑
![CI](https://github.com/arpanbasak90-cyber/shadow-vault-midnight/actions/workflows/ci.yml/badge.svg)

> A zero-knowledge privacy-preserving Counter & Secret Commitment Vault smart contract and DApp built for the Midnight Network using Compact and React.

## Live Demo
👉 **[https://shadow-vault-midnight-nj2v.vercel.app](https://shadow-vault-midnight-nj2v.vercel.app)**

## Contract Address
| Network  | Address                          |
|----------|----------------------------------|
| Preprod  | `0x02005a7b89c0d1e2f3a4b5c6d7e8f90123456789abcdef0123456789abcdef01` |

*(Note: Replace with your deployed Midnight Preprod contract address from Level 1).*

## What This Does
ShadowVault is a production-grade privacy-preserving Web3 application on the Midnight blockchain testnet. It provides two zero-knowledge smart contract primitives based on confidential credentials:
1. **Privacy Counter (`contracts/counter.compact`)**: Performs off-chain state increments via private witness inputs. Only the updated aggregate count is disclosed on-chain, keeping individual increment steps secret.
2. **Secret Commitment Vault (`contracts/shadow_vault.compact`)**: Enables users to compute off-chain 256-bit cryptographic commitments of secret payload credentials and prove secret ownership on-chain without exposing private keys or raw data payload values.

## Privacy Model
- **What is PUBLIC:**
  - Aggregated public counter tally (`counter_value`: `Uint<64>`)
  - Owner address key hash (`owner`: `Bytes<32>`)
  - Contract initialization status (`is_initialized`: `Boolean`)
  - Aggregate commitment count (`commitment_count`: `Uint<64>`)
  - Disclosed 256-bit commitment hashes (`latest_commitment`: `Bytes<32>`)
- **What is PRIVATE:**
  - Private increment step input (`witness get_increment_secret(): Uint<64>`)
  - Secret key witness inputs (`witness get_secret_key(): String`)
  - Secret payload credentials (`witness get_secret_value(): String`)
  - Random blinding factors (`witness get_blinding(): String`)
- **What the user PROVES without revealing:**
  - Valid knowledge of private increment values or possession of secret credentials matching an on-chain commitment hash without leaking raw secret inputs to network nodes.

## Privacy Claim
On-chain network nodes and observers see ONLY the verified zero-knowledge proof, the updated aggregate counter tally, and public 256-bit commitment hashes. An observer CANNOT see, reconstruct, or infer the user's private increment steps, secret keys, payload credentials, or blinding factors.

## Tech Stack
- Midnight network (Preprod Testnet)
- Compact smart contract DSL (v0.27.0+)
- Midnight.js SDK (`@midnight-ntwrk/midnight-js-contracts`, `@midnight-ntwrk/midnight-js-indexer-public-data-provider`, `@midnight-ntwrk/midnight-js-network-id`)
- React 18, Vite 5, TypeScript
- Lace wallet DApp Connector (`@midnight-ntwrk/dapp-connector-api`)

## Prerequisites
- Lace wallet extension installed (configured for Midnight Preprod)
- Node.js v22+

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
   npm run build:contract
   ```

4. **Run test suite:**
   ```bash
   npm test
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. **Build production bundle:**
   ```bash
   npm run build
   ```

## Demo Video
[https://youtu.be/80t2Se-xpZ4](https://youtu.be/80t2Se-xpZ4)
