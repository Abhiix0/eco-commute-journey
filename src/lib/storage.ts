// Centralized storage key
const STORAGE_KEY = "ecoCommuteStats";

// Trip interface
export interface Trip {
  id: string;
  date: string;
  duration: number;
  distance: number;
  co2: number;
  points: number;
  mode: string;
}

// Complete data structure
export interface EcoCommuteData {
  totalDistance: number;
  totalCO2: number;
  totalPoints: number;
  trips: Trip[];
}

// Default empty state
const defaultData: EcoCommuteData = {
  totalDistance: 0,
  totalCO2: 0,
  totalPoints: 0,
  trips: [],
};

/**
 * Initialize storage on app load
 * Creates default structure if none exists
 */
export const initializeStorage = (): void => {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    } else {
      // Validate existing data structure
      const parsed = JSON.parse(existing);
      if (!parsed.trips || !Array.isArray(parsed.trips)) {
        // Fix corrupted data
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
      }
    }
  } catch (error) {
    console.error("Error initializing storage:", error);
    // Reset to default on corruption
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  }
};

/**
 * Get all stats from storage
 * Returns default values if storage is empty or corrupted
 */
export const getStatsFromStorage = (): EcoCommuteData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { ...defaultData };
    }

    const parsed = JSON.parse(stored);
    
    // Ensure proper data structure and formatting
    return {
      totalDistance: parseFloat((parsed.totalDistance || 0).toFixed(2)),
      totalCO2: parseFloat((parsed.totalCO2 || 0).toFixed(2)),
      totalPoints: Math.round(parsed.totalPoints || 0),
      trips: Array.isArray(parsed.trips) ? parsed.trips : [],
    };
  } catch (error) {
    console.error("Error reading from storage:", error);
    return { ...defaultData };
  }
};

/**
 * Save complete stats to storage
 * Ensures data consistency and proper formatting
 */
export const saveStatsToStorage = (data: EcoCommuteData): void => {
  try {
    // Format data before saving
    const formattedData: EcoCommuteData = {
      totalDistance: parseFloat(data.totalDistance.toFixed(2)),
      totalCO2: parseFloat(data.totalCO2.toFixed(2)),
      totalPoints: Math.round(data.totalPoints),
      trips: data.trips,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formattedData));
  } catch (error) {
    console.error("Error saving to storage:", error);
    throw error;
  }
};

/**
 * Save a new trip and update totals
 * Prevents duplicate saves and ensures data consistency
 */
export const saveTrip = (tripData: Omit<Trip, "id">): Trip => {
  try {
    const currentData = getStatsFromStorage();
    
    // Create new trip with unique ID
    const newTrip: Trip = {
      id: `trip_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      date: tripData.date,
      duration: tripData.duration,
      distance: parseFloat(tripData.distance.toFixed(2)),
      co2: parseFloat(tripData.co2.toFixed(2)),
      points: Math.round(tripData.points),
      mode: tripData.mode,
    };

    // Add trip to beginning of array
    const updatedTrips = [newTrip, ...currentData.trips];

    // Recalculate totals from all trips to ensure consistency
    const totals = updatedTrips.reduce(
      (acc, trip) => ({
        totalDistance: acc.totalDistance + trip.distance,
        totalCO2: acc.totalCO2 + trip.co2,
        totalPoints: acc.totalPoints + trip.points,
      }),
      { totalDistance: 0, totalCO2: 0, totalPoints: 0 }
    );

    // Save updated data
    const updatedData: EcoCommuteData = {
      totalDistance: totals.totalDistance,
      totalCO2: totals.totalCO2,
      totalPoints: totals.totalPoints,
      trips: updatedTrips,
    };

    saveStatsToStorage(updatedData);
    
    return newTrip;
  } catch (error) {
    console.error("Error saving trip:", error);
    throw error;
  }
};

/**
 * Get recent trips with limit
 */
export const getRecentTrips = (limit: number = 5): Trip[] => {
  const data = getStatsFromStorage();
  return data.trips.slice(0, limit);
};

/**
 * Get trip count by mode
 */
export const getTripsByMode = (): Record<string, number> => {
  const data = getStatsFromStorage();
  const modeCount: Record<string, number> = {};
  
  data.trips.forEach((trip) => {
    modeCount[trip.mode] = (modeCount[trip.mode] || 0) + 1;
  });
  
  return modeCount;
};

/**
 * Format date for display
 */
export const formatTripDate = (dateString: string): string => {
  try {
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
  } catch (error) {
    return "Unknown";
  }
};

/**
 * Calculate monthly goal progress
 */
export const getMonthlyProgress = (goalKm: number = 50): number => {
  const data = getStatsFromStorage();
  return Math.min((data.totalDistance / goalKm) * 100, 100);
};

/**
 * Clear all data (for testing/reset)
 */
export const clearAllData = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  } catch (error) {
    console.error("Error clearing data:", error);
  }
};

/**
 * Get total trip count
 */
export const getTripCount = (): number => {
  const data = getStatsFromStorage();
  return data.trips.length;
};

/**
 * Verify data integrity
 * Ensures totals match sum of trips
 */
export const verifyDataIntegrity = (): boolean => {
  try {
    const data = getStatsFromStorage();
    
    // Calculate totals from trips
    const calculated = data.trips.reduce(
      (acc, trip) => ({
        distance: acc.distance + trip.distance,
        co2: acc.co2 + trip.co2,
        points: acc.points + trip.points,
      }),
      { distance: 0, co2: 0, points: 0 }
    );
    
    // Check if totals match (with small tolerance for floating point)
    const distanceMatch = Math.abs(data.totalDistance - calculated.distance) < 0.01;
    const co2Match = Math.abs(data.totalCO2 - calculated.co2) < 0.01;
    const pointsMatch = data.totalPoints === calculated.points;
    
    if (!distanceMatch || !co2Match || !pointsMatch) {
      console.warn("Data integrity issue detected. Recalculating totals...");
      
      // Fix the data
      const fixedData: EcoCommuteData = {
        totalDistance: parseFloat(calculated.distance.toFixed(2)),
        totalCO2: parseFloat(calculated.co2.toFixed(2)),
        totalPoints: calculated.points,
        trips: data.trips,
      };
      
      saveStatsToStorage(fixedData);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error verifying data integrity:", error);
    return false;
  }
};

/**
 * Export data as JSON (for backup)
 */
export const exportData = (): string => {
  const data = getStatsFromStorage();
  return JSON.stringify(data, null, 2);
};

/**
 * Import data from JSON (for restore)
 */
export const importData = (jsonString: string): boolean => {
  try {
    const data = JSON.parse(jsonString);
    
    // Validate structure
    if (
      typeof data.totalDistance === "number" &&
      typeof data.totalCO2 === "number" &&
      typeof data.totalPoints === "number" &&
      Array.isArray(data.trips)
    ) {
      saveStatsToStorage(data);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error importing data:", error);
    return false;
  }
};
