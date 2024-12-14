import { Notification } from '../types';

export const notifications: Notification[] = [
  {
    id: '1',
    type: 'mention',
    message: '@crypto_wizard mentioned you in a prediction',
    timestamp: '2 minutes ago',
    read: false,
    user: {
      username: 'crypto_wizard',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop'
    }
  },
  {
    id: '2',
    type: 'like',
    message: '@eth_trader liked your prediction',
    timestamp: '5 minutes ago',
    read: false,
    user: {
      username: 'eth_trader',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop'
    }
  },
  {
    id: '3',
    type: 'system',
    message: 'Your prediction was marked as correct!',
    timestamp: '1 hour ago',
    read: true
  }
];