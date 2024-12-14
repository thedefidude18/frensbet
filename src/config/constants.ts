// Wallet configuration
export const WALLET_CONFIG = {
  PROJECT_ID: '37b5e2fccd46c838885f41186745251e',
  SUPPORTED_CHAINS: ['mainnet', 'sepolia'] as const,
} as const;

// Network configuration
export const NETWORK_CONFIG = {
  RPC_URLS: {
    mainnet: 'https://eth-mainnet.g.alchemy.com/v2/your-api-key',
    sepolia: 'https://eth-sepolia.g.alchemy.com/v2/your-api-key',
  },
} as const;