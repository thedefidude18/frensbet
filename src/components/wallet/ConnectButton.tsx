import { Wallet } from 'lucide-react';
import { Connector } from 'wagmi';

interface ConnectButtonProps {
  connector: Connector;
  isPending: boolean;
  onConnect: () => void;
}

export default function ConnectButton({
  connector,
  isPending,
  onConnect,
}: ConnectButtonProps) {
  return (
    <button
      onClick={onConnect}
      disabled={isPending}
      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
    >
      <Wallet size={13} />
      {isPending ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
