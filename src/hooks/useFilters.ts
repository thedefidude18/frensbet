import { useState } from 'react';
import { FilterId } from '../components/filters/FilterTabs';
import { rugs } from '../data/rugs';
import { Rug } from '../types';

export function useFilters() {
  const [activeFilter, setActiveFilter] = useState<FilterId>('trending');

  const getFilteredRugs = (): Rug[] => {
    switch (activeFilter) {
      case 'trending':
        return rugs.filter(rug => rug.status === 'Active');
      case 'recent':
        return rugs.filter(rug => rug.status === 'Rugged');
      case 'new':
        return rugs.filter(rug => rug.status === 'New');
      case 'holders':
        return [...rugs].sort((a, b) => b.holders - a.holders);
      default:
        return rugs;
    }
  };

  return {
    activeFilter,
    setActiveFilter,
    getFilteredRugs,
  };
}