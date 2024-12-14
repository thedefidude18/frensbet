import { formatAddress } from '../../utils/address';

interface WalletBadgeProps {
  address: string;
}

export default function WalletBadge({ address }: WalletBadgeProps) {
  return (
    <div className="px-3 py-1.5 bg-dark-lighter rounded-lg">
      <span className="text-sm font-medium text-gray-200">
        {formatAddress(address)}
      </span>
    </div>
  );
}