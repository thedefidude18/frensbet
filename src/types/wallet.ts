import { type Connector } from 'wagmi';

export interface WalletState {
  address?: string;
  isConnected: boolean;
  isPending: boolean;
}

export interface WalletActions {
  connect: (connector: Connector) => Promise<void>;
  disconnect: () => Promise<void>;
}

export interface ConnectorDetails {
  id: string;
  name: string;
  icon: string;
}