import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getStats, getTrips, Stats, Trip } from "@/lib/storage";

interface StatsContextType {
  stats: Stats;
  trips: Trip[];
  refreshData: () => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<Stats>(getStats());
  const [trips, setTrips] = useState<Trip[]>(getTrips());

  const refreshData = () => {
    setStats(getStats());
    setTrips(getTrips());
  };

  // Load data on mount
  useEffect(() => {
    refreshData();
  }, []);

  return (
    <StatsContext.Provider value={{ stats, trips, refreshData }}>
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
