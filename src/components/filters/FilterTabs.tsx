import React from 'react';
import { useFilters } from '../../hooks/useFilters';
import FilterButton from './FilterButton';
import { TrendingUp, Clock, Sparkles, Users } from 'lucide-react';

const filters = [
  { 
    id: 'trending', 
    label: 'Trending',
    icon: TrendingUp,
    color: 'text-pink-500'
  },
  { 
    id: 'recent', 
    label: 'Recent rugs',
    icon: Clock,
    color: 'text-purple-500'
  },
  { 
    id: 'new', 
    label: 'New',
    icon: Sparkles,
    color: 'text-yellow-500'
  },
  { 
    id: 'holders', 
    label: 'Holders',
    icon: Users,
    color: 'text-green-500'
  }
] as const;

export type FilterId = typeof filters[number]['id'];

export default function FilterTabs() {
  const { activeFilter, setActiveFilter } = useFilters();

  return (
    <div className="flex justify-center">
      <div className="flex gap-2 p-4 overflow-x-auto max-w-full">
        {filters.map((filter) => (
          <FilterButton
            key={filter.id}
            label={filter.label}
            icon={filter.icon}
            iconColor={filter.color}
            active={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          />
        ))}
      </div>
    </div>
  );
}