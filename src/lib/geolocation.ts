// Haversine formula to calculate distance between two GPS coordinates
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const toRad = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

// Calculate total distance from path coordinates
export const calculateTotalDistance = (
  path: Array<{ lat: number; lng: number }>
): number => {
  if (path.length < 2) return 0;
  
  let total = 0;
  for (let i = 1; i < path.length; i++) {
    total += calculateDistance(
      path[i - 1].lat,
      path[i - 1].lng,
      path[i].lat,
      path[i].lng
    );
  }
  return total;
};

// Calculate average speed in km/h
export const calculateAverageSpeed = (
  distanceKm: number,
  durationSeconds: number
): number => {
  if (durationSeconds === 0) return 0;
  const hours = durationSeconds / 3600;
  return distanceKm / hours;
};

// Auto-detect transport mode based on average speed
export const detectTransportMode = (avgSpeedKmh: number): string => {
  if (avgSpeedKmh < 6) return "walk";
  if (avgSpeedKmh < 20) return "cycle";
  return "vehicle";
};

// Calculate CO2 saved (car equivalent: 0.12 kg per km)
export const calculateCO2Saved = (distanceKm: number): number => {
  return distanceKm * 0.12;
};

// Format time as MM:SS
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

// Geolocation error messages
export const getGeolocationErrorMessage = (error: GeolocationPositionError): string => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Location permission denied. Please enable location access.";
    case error.POSITION_UNAVAILABLE:
      return "Location information unavailable. Please check your device settings.";
    case error.TIMEOUT:
      return "Location request timed out. Please try again.";
    default:
      return "An unknown error occurred while accessing location.";
  }
};
