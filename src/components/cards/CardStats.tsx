import React from 'react';

interface StatItemProps {
  label: string;
  value: string | number;
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="flex justify-between text-xs mb-1.5">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

interface CardStatsProps {
  price: string;
  holders: number;
  marketCap: string;
  volume: string;
}

export default function CardStats({ price, holders, marketCap, volume }: CardStatsProps) {
  return (
    <div className="mt-2">
      <StatItem label="Price" value={price} />
      <StatItem label="Holders" value={holders} />
      <StatItem label="Market Cap" value={marketCap} />
      <StatItem label="Volume" value={volume} />
    </div>
  );
}