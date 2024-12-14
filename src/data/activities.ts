import { Activity } from '../types';

export const activities: Activity[] = [
  {
    id: '1',
    type: 'buy',
    user: {
      username: 'crypto_wizard',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop'
    },
    amount: '2.5 ETH',
    timestamp: '2 minutes ago',
    rugName: 'Dotto'
  },
  {
    id: '2',
    type: 'sell',
    user: {
      username: 'eth_trader',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop'
    },
    amount: '1.8 ETH',
    timestamp: '5 minutes ago',
    rugName: 'Frog World'
  },
  {
    id: '3',
    type: 'mint',
    user: {
      username: 'pixel_artist',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop'
    },
    amount: '1 NFT',
    timestamp: '10 minutes ago',
    rugName: 'Pixel Punks'
  },
  {
    id: '4',
    type: 'transfer',
    user: {
      username: 'nft_collector',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=50&h=50&fit=crop'
    },
    amount: '0.5 ETH',
    timestamp: '15 minutes ago',
    rugName: 'Moon Bears'
  }
];