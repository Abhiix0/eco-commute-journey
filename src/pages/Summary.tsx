import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Leaf, Star, Route, PartyPopper } from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import StatCard from "@/components/StatCard";
import PrimaryButton from "@/components/PrimaryButton";
import ModeSelector from "@/components/ModeSelector";
import CO2Visualization from "@/components/CO2Visualization";
import MilestoneBadge from "@/components/MilestoneBadge";
import BottomNav from "@/components/BottomNav";
import { saveTrip } from "@/lib/storage";
import { useStats } from "@/contexts/StatsContext";

const carbonFactors: Record<string, number> = {
  walk: 0, cycle: 0, bus: 0.089, metro: 0.041, bike: 0.114, car: 0.21,
};

// Confetti component
const Confetti: React.FC = () => {
  const confettiPieces = Array.from({ length: 30 });
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {confettiPieces.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-10px",
            backgroundColor: [
              "hsl(var(--eco-green))",
              "hsl(var(--eco-teal))",
              "hsl(var(--eco-lime))",
              "#FFD700",
              "#FF69B4"
            ][Math.floor(Math.random() * 5)],
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 20,
            opacity: [1, 1, 0],
            rotate: Math.random() * 720 - 360,
            x: Math.random() * 200 - 100,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

// Counter animation hook
const useCountUp = (target: number, duration: number = 1000) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest * 10) / 10);

  React.useEffect(() => {
    const controls = animate(count, target, { duration: duration / 1000, ease: "easeOut" });
    return controls.stop;
  }, [target, duration]);

  return rounded;
};

const Summary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { stats, refreshData } = useStats();
  
  const { 
    distance = "2.50", 
    time = 900, 
    mode = "walk",
    co2Saved: passedCO2 = null 
  } = (location.state as { 
    distance?: string; 
    time?: number; 
    mode?: string;
    co2Saved?: string | null;
  }) || {};
  
  const [selectedMode, setSelectedMode] = useState(mode);
  const [saved, setSaved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const distNum = parseFloat(distance);
  
  // Use passed CO2 or calculate based on selected mode
  const carbonSaved = passedCO2 
    ? parseFloat(passedCO2)
    : parseFloat(((carbonFactors.car - (carbonFactors[selectedMode] || 0)) * distNum).toFixed(2));
    
  const ecoPoints = Math.round(distNum * (selectedMode === "walk" || selectedMode === "cycle" ? 15 : 8));

  // Use real cumulative data for milestone badges
  const totalDistance = parseFloat((stats.totalDistance + distNum).toFixed(2));
  const totalCarbonSaved = parseFloat((stats.totalCO2Saved + carbonSaved).toFixed(2));

  // Animated counters
  const animatedCarbon = useCountUp(carbonSaved, 1200);
  const animatedPoints = useCountUp(ecoPoints, 1500);

  const handleSave = () => {
    setSaved(true);
    setShowConfetti(true);
    
    // Save trip to localStorage
    try {
      saveTrip({
        date: new Date().toISOString(),
        distance: parseFloat(distNum.toFixed(2)),
        duration: time,
        mode: selectedMode,
        co2Saved: parseFloat(carbonSaved.toFixed(2)),
        points: ecoPoints,
      });
      
      // Refresh global stats
      refreshData();
    } catch (error) {
      console.error("Failed to save trip:", error);
    }
    
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-b from-background to-accent/10 relative">
      {showConfetti && <Confetti />}
      
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2"
        >
          <h2 className="text-3xl font-bold text-foreground">Trip Complete! 🎉</h2>
          <p className="text-base text-muted-foreground">Here's how your commute helped the planet</p>
        </motion.div>

        {/* Distance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-2xl p-6 shadow-lg border border-border/50"
        >
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative flex h-14 w-14 items-center justify-center rounded-2xl eco-gradient shadow-md"
            >
              <div className="absolute inset-0 eco-gradient opacity-20 blur-xl rounded-2xl" />
              <Route size={26} className="text-primary-foreground relative z-10" />
            </motion.div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Distance Traveled</p>
              <p className="text-3xl font-bold text-foreground">
                {distance}
                <span className="text-lg font-normal text-muted-foreground ml-1">km</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mode selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          <label className="text-sm font-bold text-foreground uppercase tracking-wide">
            Transport Mode
          </label>
          <ModeSelector value={selectedMode} onChange={setSelectedMode} />
        </motion.div>

        {/* CO2 Visualization */}
        <CO2Visualization carbonSaved={carbonSaved} />

        {/* Stats with animated counters */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 150 }}
            className="glass-card rounded-2xl p-6 shadow-lg border border-border/50"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 200 }}
                className="relative flex h-14 w-14 items-center justify-center rounded-2xl eco-gradient shadow-md"
              >
                <div className="absolute inset-0 eco-gradient opacity-20 blur-xl rounded-2xl" />
                <Leaf size={26} className="text-primary-foreground relative z-10" />
              </motion.div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Carbon Saved</p>
                <motion.p className="text-2xl font-bold text-foreground">
                  {animatedCarbon}
                </motion.p>
                <p className="text-xs text-muted-foreground">kg CO₂</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 150 }}
            className="glass-card rounded-2xl p-6 shadow-lg border border-border/50"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.7, type: "spring", stiffness: 200 }}
                className="relative flex h-14 w-14 items-center justify-center rounded-2xl eco-gradient shadow-md"
              >
                <div className="absolute inset-0 eco-gradient opacity-20 blur-xl rounded-2xl" />
                <Star size={26} className="text-primary-foreground relative z-10" />
              </motion.div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Eco Points</p>
                <motion.p className="text-2xl font-bold text-foreground">
                  {animatedPoints}
                </motion.p>
                <p className="text-xs text-muted-foreground">pts</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Milestone Badges */}
        <MilestoneBadge distance={totalDistance} carbonSaved={totalCarbonSaved} />

        {/* Success message */}
        {saved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="flex flex-col items-center py-6"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
            >
              <PartyPopper size={56} className="text-eco-lime" />
            </motion.div>
            <p className="text-xl font-bold eco-text-gradient mt-3">Awesome! Trip Saved!</p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="pt-2"
        >
          <motion.button
            onClick={handleSave}
            disabled={saved}
            whileTap={{ scale: 0.98 }}
            whileHover={!saved ? { scale: 1.02 } : {}}
            className={`w-full py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-300 ease-in-out flex items-center justify-center gap-3 ${
              saved
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "eco-gradient text-primary-foreground shadow-xl hover:shadow-2xl glow-hover"
            }`}
          >
            {saved ? "Saving…" : "💾 Save Trip"}
          </motion.button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Summary;
