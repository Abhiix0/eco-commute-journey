import React from "react";
import { motion } from "framer-motion";
import { Award, Zap, Trophy, Star, Target, Flame } from "lucide-react";

interface Badge {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  unlocked: boolean;
}

interface MilestoneBadgeProps {
  distance: number; // in km
  carbonSaved: number; // in kg
}

const MilestoneBadge: React.FC<MilestoneBadgeProps> = ({ distance, carbonSaved }) => {
  const badges: Badge[] = [
    {
      id: "first-trip",
      icon: Zap,
      title: "First Step",
      description: "Completed first eco-trip",
      color: "from-blue-400 to-blue-600",
      unlocked: distance > 0,
    },
    {
      id: "10km-club",
      icon: Target,
      title: "10km Club",
      description: "Traveled 10km eco-friendly",
      color: "from-green-400 to-green-600",
      unlocked: distance >= 10,
    },
    {
      id: "50km-club",
      icon: Award,
      title: "50km Club",
      description: "Traveled 50km eco-friendly",
      color: "from-emerald-400 to-emerald-600",
      unlocked: distance >= 50,
    },
    {
      id: "5kg-saver",
      icon: Star,
      title: "5kg CO₂ Saver",
      description: "Saved 5kg of CO₂",
      color: "from-yellow-400 to-yellow-600",
      unlocked: carbonSaved >= 5,
    },
    {
      id: "eco-warrior",
      icon: Trophy,
      title: "Eco Warrior",
      description: "100km milestone reached",
      color: "from-purple-400 to-purple-600",
      unlocked: distance >= 100,
    },
    {
      id: "streak-master",
      icon: Flame,
      title: "On Fire",
      description: "7-day streak active",
      color: "from-orange-400 to-red-600",
      unlocked: false, // Would need streak tracking
    },
  ];

  const unlockedBadges = badges.filter((b) => b.unlocked);
  const nextBadge = badges.find((b) => !b.unlocked);

  if (unlockedBadges.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass-card rounded-2xl p-5 shadow-lg border border-border/50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-foreground">Milestones Unlocked</h3>
        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-lg">
          {unlockedBadges.length}/{badges.length}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {unlockedBadges.slice(0, 3).map((badge, index) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={badge.id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-accent/30 border border-border/30"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${badge.color} shadow-lg`}>
                <Icon size={20} className="text-white" />
              </div>
              <p className="text-xs font-semibold text-foreground text-center leading-tight">{badge.title}</p>
            </motion.div>
          );
        })}
      </div>

      {nextBadge && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="p-3 rounded-xl bg-muted/30 border border-dashed border-muted-foreground/30"
        >
          <p className="text-xs text-muted-foreground text-center">
            <span className="font-semibold">Next:</span> {nextBadge.title} - {nextBadge.description}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MilestoneBadge;
