import React from 'react';
import { Home, HelpCircle, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Rug.fun" className="h-6" />
        <span className="font-bold text-blue-500">frens.Bet</span>
      </div>
      <div className="flex items-center gap-4">
        <Home className="w-5 h-5" />
        <HelpCircle className="w-5 h-5" />
        <Settings className="w-5 h-5" />
      </div>
    </header>
  );
}
