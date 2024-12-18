// context/ActivityContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Define the type for activities (adjust based on your app needs)
type Activity = {
  id: string;
  description: string;
  timestamp: string;
};

interface ActivityContextProps {
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
}

const ActivityContext = createContext<ActivityContextProps | undefined>(undefined);

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activities, setActivities] = useState<Activity[]>([]);

  return (
    <ActivityContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivities = (): ActivityContextProps => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivities must be used within an ActivityProvider');
  }
  return context;
};
