# MegaBets Resolution Bot

Polls the MegaBets contract on MegaETH testnet every 2s and manages round lifecycle:

- **OPEN** rounds past `lockTime` → `lockRound()`
- **LOCKED** rounds past `resolveTime` → `resolveRound()`
- Rounds past grace period (300s) → `cancelRound()`

## Setup

```bash
npm install
cp .env.example .env  # edit PRIVATE_KEY and RPC_URL
npm start
```

## Config

`.env` file:
- `PRIVATE_KEY` — bot wallet private key
- `RPC_URL` — MegaETH testnet RPC endpoint
