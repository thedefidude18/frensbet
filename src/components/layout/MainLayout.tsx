import React from 'react';
import Header from '../navigation/Header';
import MobileNav from '../navigation/MobileNav';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <main className="container mx-auto px-4 max-w-6xl">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}