import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HelpCircle, Settings, Bell } from 'lucide-react'; // Bell icon
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

  const [notificationCount, setNotificationCount] = useState(0);

  // Simulate fetching notification count from an API or backend
  useEffect(() => {
    // Example: fetching the notification count from an API
    const fetchNotificationCount = () => {
      // Simulate an API call, replace this with actual logic
      setNotificationCount(5); // This would be dynamic
    };

    fetchNotificationCount();
  }, []);

  const navItems = [
    { to: '/', label: 'Challenge' },
    { to: '/activities', label: 'Activities' },
    { to: '/home', label: 'Explore' },
    { to: '/leaderboard', label: 'Ranks' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <header className="sticky top-0 bg-[#fffff] z-10 flex justify-between items-center p-2">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="frens.bet" className="h-6" />
          <span className="font-bold text-[hotpink]">frens.Bet</span>
        </Link>
      </div>

      {/* Mobile Menu */}
      <MobileMenu />

      {/* Desktop Navigation */}
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

      {/* Desktop Icons and WalletConnect */}
      <div className="hidden md:flex items-center gap-4">
     {/* Notification Icon with Badge */}
                   <Link to="/notifications" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors text-black">
                     <Bell size={24} />
                     {notificationCount > 0 && (
                       <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                       {notificationCount}
                     </span>
          )}
        </Link>

        {/* WalletConnect Button */}
        <WalletConnect />
      </div>
    </header>
  );
}
