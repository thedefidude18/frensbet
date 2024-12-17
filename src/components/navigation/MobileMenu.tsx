import React, { useState, useEffect } from 'react';
import { Menu, X, Bell } from 'lucide-react'; // Import Bell icon
import { Link, useLocation } from 'react-router-dom';
import WalletConnect from '../wallet/WalletConnect';

interface MenuItemProps {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
}

function MenuItem({ to, children, onClick, isActive }: MenuItemProps) {
  return (
    <Link
      to={to}
      className={`py-2 px-4 rounded-lg transition-colors ${
        isActive ? 'bg-blue-50 text-blue-500' : 'hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0); // Add state for notification count
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { to: '/', label: 'Home' },
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/explore', label: 'Explore' },
  ];

  // Simulate fetching notification count from an API or backend
  useEffect(() => {
    const fetchNotificationCount = () => {
      // Simulate an API call, replace with actual logic to fetch notification count
      setNotificationCount(5); // Example count
    };

    fetchNotificationCount();
  }, []);

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-black"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
          <nav className="flex flex-col p-4">
            {menuItems.map((item) => (
              <MenuItem
                key={item.to}
                to={item.to}
                onClick={toggleMenu}
                isActive={currentPath === item.to}
              >
                {item.label}
              </MenuItem>
            ))}

            {/* Add WalletConnect and Notification icon in a row */}
            <div className="mt-4 border-t pt-4 flex justify-between items-center">
              {/* Notification Icon with Badge */}
              <Link to="/notifications" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors text-black">
                <Bell size={24} />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </Link>

              {/* WalletConnect */}
              <div className="ml-4">
                <WalletConnect />
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
