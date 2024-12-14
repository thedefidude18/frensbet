import React from 'react';
import type { Rug } from '../../types';
import {
  Check,
  X,
  MessageSquare,
  Heart,
  Share2,
  AlarmClockPlusIcon,
} from 'lucide-react';

interface StatButtonProps {
  count: number;
  icon: React.ReactNode;
}

const StatButton = ({ count, icon }: StatButtonProps) => (
  <button className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors">
    {icon}
    <span className="text-sm">{count}</span>
  </button>
);

export default function RugCard({ rug }: { rug: Rug }) {
  const avatarUrlA = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${Math.random()}`;
  const avatarUrlB = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${Math.random()}`;

  return (
    <div className="bg-[#1a1b1f] border border-gray-800 rounded-xl p-3 hover:border-gray-700 transition-all">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={avatarUrlA}
          alt={`${rug.usernameA} avatar`}
          className="w-8 h-8 rounded-xl object-cover"
        />
        <div className="flex items-center">
          <span className="text-xs text-gray-400">@{rug.username}</span>
          <span className="text-sm text-white mx-1">challenges</span>
          <span className="text-xs text-gray-400">@{rug.username}</span>
          <img
            src={avatarUrlB}
            alt={`${rug.usernameB} avatar`}
            className="w-4 h-4 rounded-full ml-1"
          />
        </div>
      </div>

      {/* Prediction Content */}
      <div className="mb-4">
        <p className="text-lg text-gray-200 font-medium mb-3">
          {rug.prediction || 'ETH will break $3000 by end of January'}
        </p>
      </div>

      {/* Interaction Stats */}
      <div className="flex items-center gap-6 pt-2 border-t border-gray-800">
        <StatButton count={45} icon={<MessageSquare size={12} />} />
        <StatButton count={15} icon={<Heart size={12} />} />
        <StatButton count={0} icon={<Share2 size={12} />} />
        <span className="text-xs text-white bg-emerald-500 px-1 py-1 rounded-full">
          Pool: {rug.price}
        </span>
        <StatButton count={0} icon={<AlarmClockPlusIcon size={12} />} />
      </div>
    </div>
  );
}
