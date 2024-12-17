import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, Trophy, Bell } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function NavItem({ to, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center gap-1 ${
        isActive ? 'text-blue-500' : 'text-gray-500'
      }`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  );
}

export default function MobileNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { to: '/', icon: '🌟', label: 'Challenge' },
    { to: '/activities', icon: '🎉', label: 'Activities' },
    { to: '/home', icon: '🧭', label: 'Explore' },
    { to: '/leaderboard', icon: '🏆', label: 'Ranks' },
    { to: '/dashboard', icon: '🔔', label: 'Dashboard' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
      <div className="flex justify-around items-center p-3">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isActive={currentPath === item.to}
          />
        ))}
      </div>
    </nav>
  );
}
