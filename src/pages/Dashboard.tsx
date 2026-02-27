import React from "react";
import { Route, Leaf, Star, Bike, Bus, Footprints, TrainFront, Calendar } from "lucide-react";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import BottomNav from "@/components/BottomNav";

const chartData = [
  { name: "Walk", value: 12 },
  { name: "Cycle", value: 8 },
  { name: "Bus", value: 5 },
  { name: "Metro", value: 7 },
  { name: "Car", value: 2 },
];

const modeIcons: Record<string, React.ElementType> = {
  Walk: Footprints, Cycle: Bike, Bus: Bus, Metro: TrainFront,
};

const recentTrips = [
  { mode: "Walk", distance: "1.2 km", date: "Today", points: 18 },
  { mode: "Cycle", distance: "3.8 km", date: "Yesterday", points: 57 },
  { mode: "Bus", distance: "8.4 km", date: "Feb 25", points: 67 },
  { mode: "Metro", distance: "5.1 km", date: "Feb 24", points: 41 },
  { mode: "Walk", distance: "0.9 km", date: "Feb 23", points: 14 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen pb-24 px-4 pt-8">
      <div className="max-w-md mx-auto space-y-5">
        {/* Header */}
        <div className="opacity-0 animate-float-up">
          <h2 className="text-2xl font-bold text-foreground">Your Dashboard</h2>
          <p className="text-sm text-muted-foreground">Your eco-impact at a glance 🌿</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard icon={Route} label="Distance" value="34.2" unit="km" />
          <StatCard icon={Leaf} label="CO₂ Saved" value="5.8" unit="kg" delay={1} />
          <StatCard icon={Star} label="Points" value="1450" delay={2} />
        </div>

        {/* Chart */}
        <ChartCard title="Trips by Transport Mode" data={chartData} />

        {/* Recent trips */}
        <div className="space-y-2 opacity-0 animate-float-up stagger-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Calendar size={14} /> Recent Trips
          </h3>
          {recentTrips.map((trip, i) => {
            const Icon = modeIcons[trip.mode] || Footprints;
            return (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                  <Icon size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{trip.mode}</p>
                  <p className="text-xs text-muted-foreground">{trip.date} · {trip.distance}</p>
                </div>
                <span className="text-xs font-semibold text-primary">+{trip.points} pts</span>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
