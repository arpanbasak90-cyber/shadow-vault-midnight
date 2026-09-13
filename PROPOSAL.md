# Product Proposal

## What is the product, and who uses it?
ShadowVault is a privacy-preserving zero-knowledge credential vault and state counter for Web3 users who need to store and prove private secrets without leaking credentials on-chain.

## Why Midnight specifically?
Midnight provides off-chain Compact ZK circuit evaluation and private witness execution that transparent public chains (like Ethereum or Cardano) cannot do without exposing raw input data on-chain.

## Data Model
| Data Point | Type | Disclosed To |
|---|---|---|
| `counter_value` / `latest_commitment` | Public ledger | Everyone |
| `private_witness_step` / `secret_key` | Private witness | No one |

## Mainnet Feasibility
Highly realistic to reach Mainnet by Level 6 using Compact v0.27+ smart contracts and Lace wallet integration.