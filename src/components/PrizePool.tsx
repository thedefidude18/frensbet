import React from 'react';

export default function PrizePool() {
  return (
    <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-6 rounded-xl text-white">
      <h3 className="text-sm mb-2">Dotto prize pool</h3>
      <div className="text-3xl font-bold mb-4">$66,849.88</div>
      <img 
        src="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=300&q=80" 
        alt="Prize Pool"
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-4">
        <div className="text-sm">Next drop: 11:24:45</div>
        <div className="flex gap-1 mt-2">
          {[0,0,0,7,3,5].map((num, i) => (
            <div key={i} className="bg-white/20 rounded p-1 text-sm">{num}</div>
          ))}
        </div>
      </div>
    </div>
  );
}