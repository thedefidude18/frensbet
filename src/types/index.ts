export interface Rug {
  id: string;
  name: string;
  price: string;
  holders: number;
  marketCap: string;
  volume: string;
  avatar: string;
  status: 'Rugged' | 'Active' | 'New';
  username: string;
}

export interface Activity {
  id: string;
  type: 'buy' | 'sell' | 'mint' | 'transfer';
  user: {
    username: string;
    avatar: string;
  };
  amount: string;
  timestamp: string;
  rugName: string;
}

export interface LeaderboardUser {
  rank: number;
  username: string;
  avatar: string;
  score: number;
  winStreak: number;
  totalWins: number;
}

export interface Notification {
  id: string;
  type: 'mention' | 'like' | 'reply' | 'follow' | 'system';
  message: string;
  timestamp: string;
  read: boolean;
  user?: {
    username: string;
    avatar: string;
  };
}