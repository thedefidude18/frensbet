import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected, metaMask, walletConnect } from 'wagmi/connectors';
import { WALLET_CONFIG } from './constants';

// Default to mainnet if no network is selected
const defaultChain = mainnet;

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId: WALLET_CONFIG.PROJECT_ID,
      showQrModal: true,
      metadata: {
        name: 'frensBet',
        description: 'Challenge your frens, Top the leaderboard!',
        url: window.location.origin,
        icons: [`${window.location.origin}/logo.svg`],
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: false,
});