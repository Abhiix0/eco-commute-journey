// Local storage keys
const STORAGE_KEYS = {
  TRIPS: "eco_commute_trips",
  STATS: "eco_commute_stats",
  USER: "eco_commute_user",
};

// Trip interface
export interface Trip {
  id: string;
  date: string;
  distance: number;
  duration: number;
  mode: string;
  co2Saved: number;
  points: number;
}

// Stats interface
export interface Stats {
  totalDistance: number;
  totalCO2Saved: number;
  totalPoints: number;
  tripCount: number;
  lastUpdated: string;
}

// Initialize default stats
const defaultStats: Stats = {
  totalDistance: 0,
  totalCO2Saved: 0,
  totalPoints: 0,
  tripCount: 0,
  lastUpdated: new Date().toISOString(),
};

// Get all trips
export const getTrips = (): Trip[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TRIPS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading trips:", error);
    return [];
  }
};

// Get stats
export const getStats = (): Stats => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.STATS);
    if (!stored) return defaultStats;
    
    const parsed = JSON.parse(stored);
    // Ensure all numeric values are properly formatted
    return {
      totalDistance: parseFloat(parsed.totalDistance?.toFixed(2) || "0"),
      totalCO2Saved: parseFloat(parsed.totalCO2Saved?.toFixed(2) || "0"),
      totalPoints: Math.round(parsed.totalPoints || 0),
      tripCount: parsed.tripCount || 0,
      lastUpdated: parsed.lastUpdated || new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error loading stats:", error);
    return defaultStats;
  }
};

// Save a new trip
export const saveTrip = (trip: Omit<Trip, "id">): Trip => {
  try {
    const trips = getTrips();
    const newTrip: Trip = {
      ...trip,
      id: `trip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    
    trips.unshift(newTrip); // Add to beginning
    localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(trips));
    
    // Update stats
    updateStats(newTrip);
    
    return newTrip;
  } catch (error) {
    console.error("Error saving trip:", error);
    throw error;
  }
};

// Update stats after saving a trip
const updateStats = (trip: Trip): void => {
  try {
    const stats = getStats();
    const updatedStats: Stats = {
      totalDistance: parseFloat((stats.totalDistance + trip.distance).toFixed(2)),
      totalCO2Saved: parseFloat((stats.totalCO2Saved + trip.co2Saved).toFixed(2)),
      totalPoints: Math.round(stats.totalPoints + trip.points),
      tripCount: stats.tripCount + 1,
      lastUpdated: new Date().toISOString(),
    };
    
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updatedStats));
  } catch (error) {
    console.error("Error updating stats:", error);
  }
};

// Get recent trips (limit)
export const getRecentTrips = (limit: number = 5): Trip[] => {
  const trips = getTrips();
  return trips.slice(0, limit);
};

// Get trips by mode
export const getTripsByMode = (): Record<string, number> => {
  const trips = getTrips();
  const modeCount: Record<string, number> = {};
  
  trips.forEach((trip) => {
    modeCount[trip.mode] = (modeCount[trip.mode] || 0) + 1;
  });
  
  return modeCount;
};

// Format date for display
export const formatTripDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
};

// Clear all data (for testing)
export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.TRIPS);
  localStorage.removeItem(STORAGE_KEYS.STATS);
};

// Get monthly goal progress
export const getMonthlyProgress = (goalKm: number = 50): number => {
  const stats = getStats();
  return Math.min((stats.totalDistance / goalKm) * 100, 100);
};
