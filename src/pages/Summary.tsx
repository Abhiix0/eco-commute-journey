import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Leaf, Star, Route, PartyPopper } from "lucide-react";
import StatCard from "@/components/StatCard";
import PrimaryButton from "@/components/PrimaryButton";
import ModeSelector from "@/components/ModeSelector";
import BottomNav from "@/components/BottomNav";

const carbonFactors: Record<string, number> = {
  walk: 0, cycle: 0, bus: 0.089, metro: 0.041, bike: 0.114, car: 0.21,
};

const Summary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { distance = "2.50", time = 900 } = (location.state as { distance?: string; time?: number }) || {};
  const [mode, setMode] = useState("walk");
  const [saved, setSaved] = useState(false);

  const distNum = parseFloat(distance);
  const carbonSaved = ((carbonFactors.car - (carbonFactors[mode] || 0)) * distNum).toFixed(1);
  const ecoPoints = Math.round(distNum * (mode === "walk" || mode === "cycle" ? 15 : 8));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-8">
      <div className="max-w-md mx-auto space-y-5">
        {/* Header */}
        <div className="text-center space-y-1 opacity-0 animate-float-up">
          <h2 className="text-2xl font-bold text-foreground">Trip Complete! 🎉</h2>
          <p className="text-sm text-muted-foreground">Here's how your commute helped the planet</p>
        </div>

        {/* Distance */}
        <StatCard icon={Route} label="Distance Traveled" value={distance} unit="km" />

        {/* Mode selector */}
        <div className="space-y-2 opacity-0 animate-float-up stagger-1">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Transport Mode
          </label>
          <ModeSelector value={mode} onChange={setMode} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={Leaf} label="Carbon Saved" value={carbonSaved} unit="kg CO₂" delay={2} />
          <StatCard icon={Star} label="Eco Points" value={ecoPoints} unit="pts" delay={3} />
        </div>

        {/* Confetti placeholder */}
        {saved && (
          <div className="flex flex-col items-center py-6 opacity-0 animate-count-up">
            <PartyPopper size={48} className="text-eco-lime" />
            <p className="text-lg font-bold eco-text-gradient mt-2">Awesome! Trip Saved!</p>
          </div>
        )}

        {/* CTA */}
        <div className="pt-2">
          <PrimaryButton onClick={handleSave} disabled={saved} loading={saved}>
            {saved ? "Saving…" : "💾 Save Trip"}
          </PrimaryButton>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Summary;
