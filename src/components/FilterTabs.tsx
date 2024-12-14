import React from 'react';

export default function FilterTabs() {
  return (
    <div className="flex gap-2 p-4 overflow-x-auto">
      <button className="px-4 py-2 bg-blue-100 rounded-full text-sm whitespace-nowrap">
        Trending
      </button>
      <button className="px-4 py-2 bg-gray-100 rounded-full text-sm whitespace-nowrap">
        Recent rugs
      </button>
      <button className="px-4 py-2 bg-gray-100 rounded-full text-sm whitespace-nowrap">
        New
      </button>
      <button className="px-4 py-2 bg-gray-100 rounded-full text-sm whitespace-nowrap">
        Holders
      </button>
    </div>
  );
}