import React from "react";
import { Trophy } from "lucide-react";
import LeaderboardRow from "@/components/LeaderboardRow";
import BottomNav from "@/components/BottomNav";

const mockUsers = [
  { name: "Aanya S.", points: 2340 },
  { name: "Rohan M.", points: 2180 },
  { name: "Priya K.", points: 1950 },
  { name: "Karthik R.", points: 1720 },
  { name: "Sara L.", points: 1580 },
  { name: "You", points: 1450 },
  { name: "Dev P.", points: 1320 },
  { name: "Neha T.", points: 1100 },
  { name: "Arjun V.", points: 980 },
  { name: "Meera D.", points: 820 },
];

const Leaderboard: React.FC = () => {
  return (
    <div className="min-h-screen pb-24 px-4 pt-8">
      <div className="max-w-md mx-auto space-y-5">
        {/* Header */}
        <div className="text-center space-y-1 opacity-0 animate-float-up">
          <div className="flex items-center justify-center gap-2">
            <Trophy size={24} className="text-yellow-500" />
            <h2 className="text-2xl font-bold text-foreground">Leaderboard</h2>
          </div>
          <p className="text-sm text-muted-foreground">Top eco-commuters this month</p>
        </div>

        {/* Podium highlight */}
        <div className="flex items-end justify-center gap-3 py-4 opacity-0 animate-float-up stagger-1">
          {/* 2nd */}
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-bold text-lg border-2 border-border">
              {mockUsers[1].name.charAt(0)}
            </div>
            <div className="mt-1 bg-secondary rounded-t-lg w-16 h-16 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-muted-foreground">🥈</span>
              <span className="text-xs font-semibold text-foreground">{mockUsers[1].points}</span>
            </div>
          </div>
          {/* 1st */}
          <div className="flex flex-col items-center -mt-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full eco-gradient text-primary-foreground font-bold text-xl shadow-lg">
              {mockUsers[0].name.charAt(0)}
            </div>
            <div className="mt-1 eco-gradient rounded-t-lg w-16 h-24 flex flex-col items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">🥇</span>
              <span className="text-sm font-bold text-primary-foreground">{mockUsers[0].points}</span>
            </div>
          </div>
          {/* 3rd */}
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-bold text-lg border-2 border-border">
              {mockUsers[2].name.charAt(0)}
            </div>
            <div className="mt-1 bg-secondary rounded-t-lg w-16 h-12 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-muted-foreground">🥉</span>
              <span className="text-xs font-semibold text-foreground">{mockUsers[2].points}</span>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-2">
          {mockUsers.map((user, i) => (
            <LeaderboardRow
              key={user.name}
              rank={i + 1}
              name={user.name}
              points={user.points}
              isCurrentUser={user.name === "You"}
            />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Leaderboard;
