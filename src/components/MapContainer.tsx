import React from "react";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface MapContainerProps {
  tracking?: boolean;
  className?: string;
}

const MapContainer: React.FC<MapContainerProps> = ({ tracking = false, className = "" }) => {
  return (
    <div className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-accent/30 to-accent/50 border border-border/30 ${className}`} style={{ height: "55vh" }}>
      {/* Fake map grid */}
      <div className="absolute inset-0 opacity-15">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Decorative roads */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-muted-foreground/40 rounded" />
        <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-muted-foreground/40 rounded" />
        <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-muted-foreground/40 rounded" />
        <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-muted-foreground/40 rounded" />
      </div>

      {/* Gradient overlay on map */}
      <div className="absolute inset-0 bg-gradient-to-br from-eco-green/5 via-transparent to-eco-teal/5 pointer-events-none" />

      {/* Center pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        {tracking && (
          <>
            <motion.div
              animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute w-20 h-20 rounded-full bg-primary/30"
            />
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
              className="absolute w-20 h-20 rounded-full bg-primary/20"
            />
          </>
        )}
        <motion.div
          animate={tracking ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl eco-gradient shadow-2xl"
        >
          <MapPin size={24} className="text-primary-foreground" />
        </motion.div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent" />

      {/* Label */}
      <div className="absolute top-5 left-5 glass-card rounded-2xl px-4 py-2 shadow-lg border border-border/50">
        <p className="text-sm font-semibold text-foreground">
          {tracking ? "📍 Tracking live..." : "📍 Ready to track"}
        </p>
      </div>
    </div>
  );
};

export default MapContainer;
