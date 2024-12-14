import { LogOut } from 'lucide-react';

interface DisconnectButtonProps {
  onDisconnect: () => void;
}

export default function DisconnectButton({ onDisconnect }: DisconnectButtonProps) {
  return (
    <button
      onClick={onDisconnect}
      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
    >
      <LogOut size={16} />
      Disconnect
    </button>
  );
}