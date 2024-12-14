import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FilterButtonProps {
  label: string;
  icon: LucideIcon;
  iconColor: string;
  active?: boolean;
  onClick?: () => void;
}

export default function FilterButton({ 
  label, 
  icon: Icon,
  iconColor,
  active = false, 
  onClick 
}: FilterButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all
        flex items-center gap-2
        ${active 
          ? 'bg-blue-100 text-blue-700 shadow-sm' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
      `}
    >
      <Icon 
        size={16} 
        className={`${active ? 'text-blue-700' : iconColor}`}
      />
      {label}
    </button>
  );
}