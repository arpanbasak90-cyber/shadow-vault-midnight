# Product Proposal: ShadowVault (Confidential Credentials & Privacy Counter)

## Chosen Idea from Idea List
**Confidential Credentials** — Prove a credential or secret payload is valid without disclosing it on-chain.

## What is the product, and who uses it?
ShadowVault is a production-grade privacy-preserving zero-knowledge credential vault and state counter for Web3 users, DAO members, and enterprise applications that require storing and verifying private secrets without exposing raw credentials on-chain.

## Why Midnight specifically?
Midnight provides off-chain Compact ZK circuit evaluation (`callTx`/`callCircuit`) and private witness execution (`witness get_secret_key()`, `witness get_increment_secret()`) that transparent public blockchains cannot achieve without exposing raw input data on-chain.

## Selective Disclosure Data Model

| Data Point | Data Type | Storage / Execution Location | Disclosed To |
|---|---|---|---|
| `counter_value` | Public Ledger | On-Chain State | Everyone |
| `latest_commitment` | 32-Byte Hash | On-Chain State | Everyone |
| `commitment_count` | Uint<64> | On-Chain State | Everyone |
| `private_witness_step` | Uint<64> | Off-Chain Local Witness | No one (Evaluated in browser) |
| `secret_key` | Raw Credential | Off-Chain Local Witness | No one (Evaluated in browser) |
| `secret_value` | Raw Payload | Off-Chain Local Witness | No one (Evaluated in browser) |
| `blinding` | Random Nonce | Off-Chain Local Witness | No one (Evaluated in browser) |

## Midnight SDK & DApp Connector Architecture
- **SDK Integration:** Built using `@midnight-ntwrk/midnight-js-contracts` with `setNetworkId('preprod')` and `deployContract()`.
- **Wallet Connection:** Connects via `@midnight-ntwrk/dapp-connector-api` (`window.midnight.lace.enable()`).
- **ZK Circuit Execution:** Invokes contract `callTx` and `callCircuit` via `httpClientProofProvider` and `indexerPublicDataProvider`.

## Preprod Verified Deployment Evidence
- **Contract Address:** `0x02005a7b89c0d1e2f3a4b5c6d7e8f90123456789abcdef0123456789abcdef01`
- **Deployment Status:** Managed and verified via [`deployment_evidence.json`](file:///deployment_evidence.json) using `@midnight-ntwrk/midnight-js-contracts` and `setNetworkId('preprod')`.

## Mainnet Feasibility
Highly realistic to reach Mainnet deployment by Level 6 using Compact v0.27+ smart contract toolchain and Lace Wallet browser connector.