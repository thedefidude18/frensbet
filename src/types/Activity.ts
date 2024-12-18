export interface Activity {
    id: string;
    description: string;
    timestamp: string; // Note the change from number to string
    type?: 'incoming' | 'outgoing';
    amount?: number;
    tokenSymbol?: string;
  }