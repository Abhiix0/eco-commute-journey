import React from "react";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface LeaderboardRowProps {
  rank: number;
  name: string;
  points: number;
  isCurrentUser?: boolean;
}

const trophyColors: Record<number, string> = {
  1: "text-yellow-500",
  2: "text-gray-400",
  3: "text-amber-600",
};

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ rank, name, points, isCurrentUser = false }) => {
  const isTop3 = rank <= 3;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ease-in-out ${
        isCurrentUser
          ? "glass-card border-2 border-primary/40 shadow-lg"
          : "bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/20 shadow-sm hover:shadow-md"
      }`}
    >
      {isCurrentUser && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-primary/40 pointer-events-none"
          animate={{
            boxShadow: [
              "0 0 0 0 hsl(var(--primary) / 0)",
              "0 0 20px 2px hsl(var(--primary) / 0.3)",
              "0 0 0 0 hsl(var(--primary) / 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      
      {/* Rank */}
      <div className="flex h-10 w-10 items-center justify-center rounded-xl font-bold text-base shrink-0">
        {isTop3 ? (
          <Trophy size={22} className={trophyColors[rank]} />
        ) : (
          <span className="text-muted-foreground">{rank}</span>
        )}
      </div>

      {/* Avatar */}
      <motion.div
        whileHover={{ rotate: 5 }}
        className={`flex h-11 w-11 items-center justify-center rounded-xl text-base font-bold shrink-0 shadow-md ${
          isTop3 ? "eco-gradient text-primary-foreground" : "bg-secondary text-secondary-foreground"
        }`}
      >
        {name.charAt(0).toUpperCase()}
      </motion.div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-base text-foreground truncate">
          {name}
          {isCurrentUser && <span className="text-xs text-primary ml-2 font-bold">(You)</span>}
        </p>
      </div>

      {/* Points */}
      <div className="text-right shrink-0">
        <p className="font-bold text-base text-foreground">{points.toLocaleString()}</p>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wide">eco-pts</p>
      </div>
    </motion.div>
  );
};

export default LeaderboardRow;
