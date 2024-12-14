import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { formatAddress } from '../utils/address';

export function useWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  return {
    // State
    address,
    isConnected,
    isPending,
    
    // Actions
    connect,
    disconnect,
    
    // Available connectors
    connectors,
    
    // Utilities
    formatAddress: (addr?: string) => formatAddress(addr),
  };
}