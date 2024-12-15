import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
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
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { to: '/', label: 'Home' },
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/notifications', label: 'Notifications' },
    { to: '/explore', label: 'Explore' },
  ];

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

            {/* Add WalletConnect to mobile menu */}
            <div className="mt-4 border-t pt-4">
              <WalletConnect />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
