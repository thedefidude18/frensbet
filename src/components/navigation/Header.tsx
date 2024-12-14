import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HelpCircle, Settings } from 'lucide-react';
import MobileMenu from './MobileMenu';
import WalletConnect from '../wallet/WalletConnect';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
}

function NavLink({ to, children, isActive }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`transition-colors ${
        isActive
          ? 'text-blue-500 font-medium'
          : 'text-gray-600 hover:text-blue-500'
      }`}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/notifications', label: 'Notifications' },
    { to: '/explore', label: 'Explore' },
  ];

  return (
    <header className="sticky top-0 bg-[#1a1b1f] z-10 flex justify-between items-center p-4 border-b border-gray-800">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="frens.bet" className="h-6" />
          <span className="font-bold text-blue-500">frensBet</span>
        </Link>
      </div>

      <MobileMenu />

      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            isActive={currentPath === item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Ensure WalletConnect is rendered only once */}
      <div className="hidden md:flex items-center gap-4">
        <WalletConnect />
      </div>
    </header>
  );
}
