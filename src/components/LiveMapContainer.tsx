import React from "react";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Coordinate {
  lat: number;
  lng: number;
}

interface LiveMapContainerProps {
  tracking: boolean;
  currentPosition: Coordinate | null;
  path: Coordinate[];
  className?: string;
}

const LiveMapContainer: React.FC<LiveMapContainerProps> = ({
  tracking,
  currentPosition,
  path,
  className = "",
}) => {
  // Convert coordinates to SVG path
  const generatePolyline = () => {
    if (path.length < 2) return "";
    
    // Simple projection for visualization (not geographically accurate)
    const points = path.map((coord) => {
      const x = 50 + (coord.lng - path[0].lng) * 10000;
      const y = 50 - (coord.lat - path[0].lat) * 10000;
      return `${x},${y}`;
    });
    
    return points.join(" ");
  };

  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-br from-eco-green/10 via-background to-eco-teal/10 border-b border-border/30 ${className}`}
      style={{ height: "70vh" }}
    >
      {/* Clean map grid background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="map-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-muted-foreground"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid)" />
        </svg>
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-0 right-0 h-px bg-muted-foreground/50" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-muted-foreground/50" />
        <div className="absolute left-1/3 top-0 bottom-0 w-px bg-muted-foreground/50" />
        <div className="absolute left-2/3 top-0 bottom-0 w-px bg-muted-foreground/50" />
      </div>

      {/* Polyline route - Visual proof of tracking */}
      <AnimatePresence>
        {path.length >= 2 && (
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 5 }}
          >
            <motion.polyline
              points={generatePolyline()}
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--eco-green))" stopOpacity="0.8" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                <stop offset="100%" stopColor="hsl(var(--eco-teal))" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Path points visualization - Shows each GPS update */}
      {tracking && path.length > 0 && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 6 }}>
          {path.map((point, index) => {
            const x = 50 + (point.lng - path[0].lng) * 10000;
            const y = 50 - (point.lat - path[0].lat) * 10000;
            const isRecent = index >= path.length - 3;
            
            return (
              <motion.div
                key={`${point.lat}-${point.lng}-${index}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: isRecent ? 0.8 : 0.3 }}
                className="absolute w-2 h-2 rounded-full bg-primary"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}
        </div>
      )}

      {/* Current position marker - Always centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
        {tracking && (
          <>
            {/* Pulse rings - Visual proof of active tracking */}
            <motion.div
              animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute w-28 h-28 rounded-full bg-primary/30"
            />
            <motion.div
              animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
              className="absolute w-28 h-28 rounded-full bg-primary/20"
            />
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
              className="absolute w-28 h-28 rounded-full bg-primary/40"
            />
          </>
        )}
        
        {/* GPS marker - Centered */}
        <motion.div
          animate={tracking ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl eco-gradient shadow-2xl"
        >
          <MapPin size={32} className="text-primary-foreground" />
        </motion.div>

        {/* Real-time coordinate display - Proof of GPS updates */}
        {tracking && currentPosition && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-16 glass-card rounded-xl px-3 py-1.5 shadow-md border border-border/50"
          >
            <p className="text-[10px] font-mono text-muted-foreground">
              {currentPosition.lat.toFixed(6)}, {currentPosition.lng.toFixed(6)}
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom gradient for card overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />

      {/* Status label - Centered with GPS point count */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 glass-card rounded-2xl px-4 py-2 shadow-lg border border-border/50">
        <div className="flex items-center justify-center gap-2">
          {tracking ? (
            <>
              <motion.span
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              <p className="text-sm font-semibold text-foreground">Live Tracking</p>
              {path.length > 0 && (
                <motion.span
                  key={path.length}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-xs text-primary font-bold ml-1"
                >
                  ({path.length} pts)
                </motion.span>
              )}
            </>
          ) : (
            <p className="text-sm font-semibold text-foreground flex items-center gap-2">
              📍 Ready to Track
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveMapContainer;
