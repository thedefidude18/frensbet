import { useWallet } from '../../hooks/useWallet';
import ConnectButton from './ConnectButton';
import DisconnectButton from './DisconnectButton';
import WalletBadge from './WalletBadge';
import Dashboard from '../Dashboard.tsx';

export default function WalletConnect() {
  const { address, isConnected, connect, connectors, isPending, disconnect } = useWallet();

  return (
    <div className="wallet-connect">
      {isConnected && address ? (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <WalletBadge address={address} />
            <DisconnectButton onDisconnect={disconnect} />
          </div>
          {/* Render Dashboard dynamically */}
          <Dashboard userAddress={address} />
        </div>
      ) : (
        <div className="flex gap-2">
          <ConnectButton
            connector={connectors[1]}
            isPending={isPending}
            onConnect={() => connect({ connector: connectors[1] })}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
