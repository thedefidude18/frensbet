import React from 'react';
import FilterTabs from '../components/filters/FilterTabs';
import RugCard from '../components/cards/RugCard';
import { useFilters } from '../hooks/useFilters';

export default function Home() {
  const { getFilteredRugs } = useFilters();
  const filteredRugs = getFilteredRugs();

  return (
    <>
      <FilterTabs />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredRugs.map((rug) => (
          <RugCard key={rug.id} rug={rug} />
        ))}
      </div>
    </>
  );
}