import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getStatsFromStorage, EcoCommuteData } from "@/lib/storage";

interface StatsContextType {
  stats: EcoCommuteData;
  refreshData: () => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<EcoCommuteData>(getStatsFromStorage());

  const refreshData = () => {
    setStats(getStatsFromStorage());
  };

  // Load data on mount
  useEffect(() => {
    refreshData();
  }, []);

  return (
    <StatsContext.Provider value={{ stats, refreshData }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = (): StatsContextType => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error("useStats must be used within StatsProvider");
  }
  return context;
};
