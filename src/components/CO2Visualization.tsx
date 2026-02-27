import React from "react";
import { motion } from "framer-motion";
import { Cloud } from "lucide-react";

interface CO2VisualizationProps {
  carbonSaved: number; // in kg
}

const CO2Visualization: React.FC<CO2VisualizationProps> = ({ carbonSaved }) => {
  // Calculate cloud size based on carbon saved (inverse - more saved = smaller cloud)
  const maxSize = 120;
  const minSize = 40;
  const cloudSize = Math.max(minSize, maxSize - carbonSaved * 10);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card rounded-2xl p-6 shadow-lg border border-border/50 bg-gradient-to-br from-accent/20 to-transparent"
    >
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-bold text-foreground">CO₂ Impact Visualization</h3>
        
        <div className="relative flex items-center justify-center h-32 w-full">
          {/* Shrinking CO2 cloud */}
          <motion.div
            initial={{ scale: 1.5, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute"
            style={{ width: cloudSize, height: cloudSize }}
          >
            <Cloud size={cloudSize} className="text-muted-foreground" />
          </motion.div>

          {/* Particles dispersing */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8;
            const distance = 60;
            const x = Math.cos((angle * Math.PI) / 180) * distance;
            const y = Math.sin((angle * Math.PI) / 180) * distance;

            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary/40"
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x,
                  y,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5 + i * 0.1,
                  ease: "easeOut",
                }}
              />
            );
          })}

          {/* Center value */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1, type: "spring", stiffness: 200 }}
            className="relative z-10 flex flex-col items-center justify-center"
          >
            <p className="text-3xl font-bold eco-text-gradient">{carbonSaved}</p>
            <p className="text-xs text-muted-foreground">kg CO₂</p>
          </motion.div>
        </div>

        <div className="flex items-center gap-2 text-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-2xl">🌱</span>
          </motion.div>
          <p className="text-xs text-muted-foreground">
            You prevented this much CO₂ from entering the atmosphere!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CO2Visualization;
