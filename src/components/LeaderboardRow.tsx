import React from "react";
import { Trophy } from "lucide-react";

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
    <div
      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
        isCurrentUser
          ? "eco-gradient-light border border-primary/20"
          : "bg-card border border-border hover:border-primary/10"
      }`}
    >
      {/* Rank */}
      <div className="flex h-8 w-8 items-center justify-center rounded-lg font-bold text-sm shrink-0">
        {isTop3 ? (
          <Trophy size={20} className={trophyColors[rank]} />
        ) : (
          <span className="text-muted-foreground">{rank}</span>
        )}
      </div>

      {/* Avatar */}
      <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold shrink-0 ${
        isTop3 ? "eco-gradient text-primary-foreground" : "bg-secondary text-secondary-foreground"
      }`}>
        {name.charAt(0).toUpperCase()}
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-foreground truncate">
          {name}
          {isCurrentUser && <span className="text-xs text-primary ml-1">(You)</span>}
        </p>
      </div>

      {/* Points */}
      <div className="text-right shrink-0">
        <p className="font-bold text-sm text-foreground">{points.toLocaleString()}</p>
        <p className="text-[10px] text-muted-foreground">eco-pts</p>
      </div>
    </div>
  );
};

export default LeaderboardRow;
