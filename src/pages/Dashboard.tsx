import React from "react";
import { Route, Leaf, Star, Bike, Bus, Footprints, TrainFront, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import CircularProgress from "@/components/CircularProgress";
import ImpactEquivalent from "@/components/ImpactEquivalent";
import ProjectionCard from "@/components/ProjectionCard";
import BottomNav from "@/components/BottomNav";
import { useStats } from "@/contexts/StatsContext";
import { getRecentTrips, getTripsByMode, formatTripDate, getMonthlyProgress } from "@/lib/storage";

const Dashboard: React.FC = () => {
  const { stats, trips } = useStats();
  
  // Use real stored data with proper formatting
  const totalDistance = stats.totalDistance.toFixed(2);
  const carbonSaved = stats.totalCO2Saved.toFixed(2);
  const ecoPoints = stats.totalPoints;
  const monthlyGoal = 50; // km
  const goalProgress = getMonthlyProgress(monthlyGoal);
  
  // Get recent trips
  const recentTrips = getRecentTrips(5);
  
  // Get trips by mode for chart
  const tripsByMode = getTripsByMode();
  const chartData = Object.entries(tripsByMode).map(([mode, count]) => ({
    name: mode.charAt(0).toUpperCase() + mode.slice(1),
    value: count,
  }));

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-b from-background to-accent/10">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-foreground">Your Dashboard</h2>
          <p className="text-base text-muted-foreground mt-1">Your eco-impact at a glance 🌿</p>
        </motion.div>

        {/* Circular Progress Goal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-2xl p-6 shadow-lg border border-border/50 flex justify-center"
        >
          <CircularProgress
            progress={goalProgress}
            label="Monthly Goal"
            value={`${totalDistance} km`}
            goal={`${monthlyGoal} km`}
          />
        </motion.div>

        {/* Stat cards - Larger and more premium */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 150 }}
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-5 shadow-lg border border-border/50"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
                className="relative flex h-14 w-14 items-center justify-center rounded-2xl eco-gradient shadow-md"
              >
                <div className="absolute inset-0 eco-gradient opacity-20 blur-xl rounded-2xl" />
                <Route size={24} className="text-primary-foreground relative z-10" />
              </motion.div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Distance</p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
                  className="text-2xl font-bold text-foreground"
                >
                  {totalDistance}
                </motion.p>
                <p className="text-xs text-muted-foreground">km</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 150 }}
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-5 shadow-lg border border-border/50"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 }}
                className="relative flex h-14 w-14 items-center justify-center rounded-2xl eco-gradient shadow-md"
              >
                <div className="absolute inset-0 eco-gradient opacity-20 blur-xl rounded-2xl" />
                <Leaf size={24} className="text-primary-foreground relative z-10" />
              </motion.div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">CO₂ Saved</p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}
                  className="text-2xl font-bold text-foreground"
                >
                  {carbonSaved}
                </motion.p>
                <p className="text-xs text-muted-foreground">kg</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 150 }}
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-5 shadow-lg border border-border/50"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 200 }}
                className="relative flex h-14 w-14 items-center justify-center rounded-2xl eco-gradient shadow-md"
              >
                <div className="absolute inset-0 eco-gradient opacity-20 blur-xl rounded-2xl" />
                <Star size={24} className="text-primary-foreground relative z-10" />
              </motion.div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Points</p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 200 }}
                  className="text-2xl font-bold text-foreground"
                >
                  {ecoPoints}
                </motion.p>
                <p className="text-xs text-muted-foreground">pts</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Impact Equivalent Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ImpactEquivalent carbonSaved={carbonSaved} />
        </motion.div>

        {/* Projection Card */}
        <ProjectionCard userCarbonSaved={carbonSaved} multiplier={1000} />

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <ChartCard title="Trips by Transport Mode" data={chartData} />
        </motion.div>

        {/* Recent trips */}
        <div className="space-y-3">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-base font-bold text-foreground flex items-center gap-2"
          >
            <Calendar size={18} /> Recent Trips
          </motion.h3>
          
          {recentTrips.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="glass-card rounded-2xl p-8 text-center border border-border/50"
            >
              <p className="text-sm text-muted-foreground">No trips yet. Start tracking your commute!</p>
            </motion.div>
          ) : (
            recentTrips.map((trip, i) => {
              const modeIcons: Record<string, React.ElementType> = {
                walk: Footprints,
                cycle: Bike,
                bus: Bus,
                carpool: Bus,
                vehicle: TrainFront,
              };
              const Icon = modeIcons[trip.mode] || Footprints;
              
              return (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.1 + i * 0.08 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
                >
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-accent/50">
                    <div className="absolute inset-0 eco-gradient-light rounded-xl" />
                    <Icon size={20} className="text-primary relative z-10" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-foreground capitalize">{trip.mode}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTripDate(trip.date)} · {trip.distance.toFixed(1)} km
                    </p>
                  </div>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.2 + i * 0.08, type: "spring", stiffness: 200 }}
                    className="text-sm font-bold text-primary"
                  >
                    +{trip.points} pts
                  </motion.span>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
