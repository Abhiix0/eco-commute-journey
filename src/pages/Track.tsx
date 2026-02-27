import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Timer, Route, Zap } from "lucide-react";
import MapContainer from "@/components/MapContainer";
import StatCard from "@/components/StatCard";
import PrimaryButton from "@/components/PrimaryButton";
import BottomNav from "@/components/BottomNav";

const Track: React.FC = () => {
  const navigate = useNavigate();
  const [tracking, setTracking] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!tracking) return;
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
      setDistance((d) => +(d + 0.008 + Math.random() * 0.005).toFixed(3));
    }, 1000);
    return () => clearInterval(interval);
  }, [tracking]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const handleStop = () => {
    setTracking(false);
    navigate("/summary", { state: { distance: distance.toFixed(2), time: seconds } });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Map */}
      <MapContainer tracking={tracking} className="rounded-none" />

      {/* Floating cards */}
      <div className="relative -mt-16 px-4 space-y-3 z-10">
        {/* Status */}
        {tracking && (
          <div className="flex items-center gap-2 bg-card/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-md border border-border w-fit mx-auto">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
            <span className="text-xs font-medium text-foreground">Tracking your commute…</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={Timer} label="Duration" value={formatTime(seconds)} />
          <StatCard icon={Route} label="Distance" value={distance.toFixed(2)} unit="km" delay={1} />
        </div>

        <div className="pt-2">
          {!tracking ? (
            <PrimaryButton onClick={() => setTracking(true)}>
              <Zap size={18} /> Start Commute
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={handleStop} variant="outline">
              ⏹ Stop Commute
            </PrimaryButton>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Track;
