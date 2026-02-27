import React from "react";
import { motion } from "framer-motion";
import { Timer, Route, Leaf, Footprints, Bike, Car } from "lucide-react";

interface FloatingTrackerCardProps {
  duration: string;
  distance: number;
  co2Saved: number;
  detectedMode: string;
}

const modeIcons: Record<string, React.ElementType> = {
  walk: Footprints,
  cycle: Bike,
  vehicle: Car,
};

const modeLabels: Record<string, string> = {
  walk: "Walking",
  cycle: "Cycling",
  vehicle: "Vehicle",
};

const FloatingTrackerCard: React.FC<FloatingTrackerCardProps> = ({
  duration,
  distance,
  co2Saved,
  detectedMode,
}) => {
  const ModeIcon = modeIcons[detectedMode] || Footprints;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
      className="fixed bottom-28 left-4 right-4 z-20"
    >
      <div className="max-w-md mx-auto glass-card rounded-3xl p-6 shadow-2xl border border-border/50">
        {/* Main distance display */}
        <div className="text-center mb-5">
          <motion.p
            key={distance.toFixed(2)}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="text-6xl font-bold eco-text-gradient leading-none"
          >
            {distance.toFixed(2)}
          </motion.p>
          <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mt-2">
            kilometers
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-3 gap-3">
          {/* Duration */}
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-accent/30 border border-border/30">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl eco-gradient-light mb-2">
              <Timer size={18} className="text-primary" />
            </div>
            <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wide text-center">Duration</p>
            <motion.p
              key={duration}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-base font-bold text-foreground"
            >
              {duration}
            </motion.p>
          </div>

          {/* CO2 Saved */}
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-accent/30 border border-border/30">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl eco-gradient-light mb-2">
              <Leaf size={18} className="text-primary" />
            </div>
            <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wide text-center">CO₂ Saved</p>
            <motion.p
              key={co2Saved.toFixed(2)}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-base font-bold text-foreground"
            >
              {co2Saved.toFixed(2)}
            </motion.p>
          </div>

          {/* Detected Mode */}
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-accent/30 border border-border/30">
            <motion.div
              key={detectedMode}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex h-9 w-9 items-center justify-center rounded-xl eco-gradient-light mb-2"
            >
              <ModeIcon size={18} className="text-primary" />
            </motion.div>
            <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wide text-center">Mode</p>
            <p className="text-base font-bold text-foreground capitalize">{modeLabels[detectedMode]}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingTrackerCard;
