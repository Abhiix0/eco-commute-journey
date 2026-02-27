import React from "react";
import { MapPin } from "lucide-react";

interface MapContainerProps {
  tracking?: boolean;
  className?: string;
}

const MapContainer: React.FC<MapContainerProps> = ({ tracking = false, className = "" }) => {
  return (
    <div className={`relative w-full rounded-2xl overflow-hidden bg-accent/50 border border-border ${className}`} style={{ height: "55vh" }}>
      {/* Fake map grid */}
      <div className="absolute inset-0 opacity-20">
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
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-muted-foreground rounded" />
        <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-muted-foreground rounded" />
        <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-muted-foreground rounded" />
        <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-muted-foreground rounded" />
      </div>

      {/* Center pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        {tracking && (
          <div className="absolute w-16 h-16 rounded-full bg-primary/20 animate-pulse-dot" />
        )}
        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full eco-gradient shadow-lg">
          <MapPin size={20} className="text-primary-foreground" />
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/80 to-transparent" />

      {/* Label */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-sm border border-border">
        <p className="text-xs font-medium text-muted-foreground">
          {tracking ? "📍 Tracking live..." : "📍 Ready to track"}
        </p>
      </div>
    </div>
  );
};

export default MapContainer;
