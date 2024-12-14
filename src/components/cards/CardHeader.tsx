import React from 'react';

interface CardHeaderProps {
  name: string;
  status: string;
  avatar: string;
  username: string;
}

export default function CardHeader({ name, status, avatar, username }: CardHeaderProps) {
  const statusColor = {
    'Rugged': 'text-red-500',
    'New': 'text-green-500',
    'Active': 'text-blue-500'
  }[status] || 'text-gray-500';

  return (
    <div className="flex items-center gap-2">
      <img 
        src={avatar} 
        alt={username}
        className="w-8 h-8 rounded-full object-cover"
      />
      <div>
        <h3 className="font-medium text-sm">{name}</h3>
        <span className={`text-xs ${statusColor}`}>{status}</span>
      </div>
    </div>
  );
}