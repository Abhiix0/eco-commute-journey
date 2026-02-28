/**
 * Calculate average speed from distance and duration
 * @param distanceKm - Distance traveled in kilometers
 * @param durationSeconds - Duration in seconds
 * @returns Average speed in km/h, or 0 if duration is invalid
 */
export function calculateAverageSpeed(
  distanceKm: number,
  durationSeconds: number
): number {
  // Prevent divide-by-zero errors
  if (!durationSeconds || durationSeconds <= 0) return 0;
  if (!distanceKm || distanceKm < 0) return 0;
  
  const hours = durationSeconds / 3600;
  return distanceKm / hours;
}

/**
 * Detect transport mode based on average speed
 * @param avgSpeedKmh - Average speed in km/h
 * @returns Transport mode: "walk", "cycle", or "vehicle"
 */
export function detectTransportMode(avgSpeedKmh: number): string {
  if (avgSpeedKmh < 6) return "walk";
  if (avgSpeedKmh < 20) return "cycle";
  return "vehicle";
}

/**
 * Format speed for display
 * @param speedKmh - Speed in km/h
 * @returns Formatted speed string
 */
export function formatSpeed(speedKmh: number): string {
  return `${speedKmh.toFixed(1)} km/h`;
}
