import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/': 'Home',
  '/activities': 'Activities',
  '/leaderboard': 'Leaderboard',
  '/notifications': 'Notifications',
};

export function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    const baseTitle = 'Rug.fun';
    const pageTitle = pageTitles[location.pathname];
    
    document.title = pageTitle 
      ? `${pageTitle} | ${baseTitle}` 
      : baseTitle;
  }, [location]);
}