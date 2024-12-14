import { useWallet } from '../../hooks/useWallet';
import ConnectButton from './ConnectButton';
import DisconnectButton from './DisconnectButton';
import WalletBadge from './WalletBadge';

export default function WalletConnect() {
  const { address, isConnected, connect, connectors, isPending, disconnect } =
    useWallet();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-4">
        <WalletBadge address={address} />
        <DisconnectButton onDisconnect={disconnect} />
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <ConnectButton
        connector={connectors[1]}
        isPending={isPending}
        onConnect={() => connect({ connector: connectors[1] })}
        className="hidden" // This will hide the second button
      />
    </div>
  );
}
