import React from "react";
import { motion } from "framer-motion";
import { Footprints, Bike, Bus, Users } from "lucide-react";

interface ModeChipsProps {
  selectedMode: string;
  onModeChange: (mode: string) => void;
}

const modes = [
  { value: "walk", label: "Walk", icon: Footprints },
  { value: "cycle", label: "Cycle", icon: Bike },
  { value: "bus", label: "Bus", icon: Bus },
  { value: "carpool", label: "Carpool", icon: Users },
];

const ModeChips: React.FC<ModeChipsProps> = ({ selectedMode, onModeChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isSelected = selectedMode === mode.value;
        
        return (
          <motion.button
            key={mode.value}
            onClick={() => onModeChange(mode.value)}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
              isSelected
                ? "eco-gradient text-primary-foreground shadow-lg"
                : "glass-card border border-border/50 text-foreground hover:border-primary/30"
            }`}
          >
            <Icon size={18} />
            {mode.label}
          </motion.button>
        );
      })}
    </div>
  );
};

export default ModeChips;
