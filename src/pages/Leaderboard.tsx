import React from "react";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";
import LeaderboardRow from "@/components/LeaderboardRow";
import EcoBadge from "@/components/EcoBadge";
import BottomNav from "@/components/BottomNav";
import { useStats } from "@/contexts/StatsContext";

// Mock leaderboard data (in real app, this would come from backend)
const generateMockLeaderboard = (userPoints: number) => {
  const mockUsers = [
    { name: "Aanya S.", points: 2340 },
    { name: "Rohan M.", points: 2180 },
    { name: "Priya K.", points: 1950 },
    { name: "Karthik R.", points: 1720 },
    { name: "Sara L.", points: 1580 },
    { name: "Dev P.", points: 1320 },
    { name: "Neha T.", points: 1100 },
    { name: "Arjun V.", points: 980 },
    { name: "Meera D.", points: 820 },
  ];
  
  // Insert user into leaderboard
  const userEntry = { name: "You", points: userPoints };
  const leaderboard = [...mockUsers, userEntry].sort((a, b) => b.points - a.points);
  
  return leaderboard.slice(0, 10);
};

const Leaderboard: React.FC = () => {
  const { stats } = useStats();
  
  // Use real user points from storage
  const userPoints = stats.totalPoints;
  const mockUsers = generateMockLeaderboard(userPoints);
  
  // Find user's rank
  const userRank = mockUsers.findIndex(user => user.name === "You") + 1;
  const hasTrips = stats.trips.length > 0;
  
  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-b from-background to-accent/10">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2"
        >
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Trophy size={28} className="text-yellow-500" />
            </motion.div>
            <h2 className="text-3xl font-bold text-foreground">Leaderboard</h2>
          </div>
          <p className="text-sm text-muted-foreground">Top eco-commuters this month</p>
          {hasTrips && userRank > 0 && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs font-semibold text-primary"
            >
              Your Rank: #{userRank} • {userPoints} points
            </motion.p>
          )}
        </motion.div>

        {/* Podium highlight */}
        {mockUsers.length >= 3 && (
          <div className="flex items-end justify-center gap-4 py-6">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 150 }}
            className="flex flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 text-white font-bold text-xl shadow-lg border-2 border-white/50"
            >
              {mockUsers[1].name.charAt(0)}
            </motion.div>
            <div className="mt-2 bg-gradient-to-br from-gray-300 to-gray-400 rounded-t-2xl w-20 h-20 flex flex-col items-center justify-center shadow-lg">
              <span className="text-base font-bold text-white">🥈</span>
              <span className="text-sm font-bold text-white">{mockUsers[1].points}</span>
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 150 }}
            className="flex flex-col items-center -mt-6"
          >
            <motion.div
              whileHover={{ scale: 1.15, rotate: 5 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl eco-gradient text-primary-foreground font-bold text-2xl shadow-2xl border-2 border-white/50 glow-border"
            >
              {mockUsers[0].name.charAt(0)}
            </motion.div>
            <div className="mt-2 eco-gradient rounded-t-2xl w-20 h-28 flex flex-col items-center justify-center shadow-2xl glow-border">
              <span className="text-lg font-bold text-primary-foreground">🥇</span>
              <span className="text-base font-bold text-primary-foreground">{mockUsers[0].points}</span>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 150 }}
            className="flex flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 text-white font-bold text-xl shadow-lg border-2 border-white/50"
            >
              {mockUsers[2].name.charAt(0)}
            </motion.div>
            <div className="mt-2 bg-gradient-to-br from-amber-600 to-amber-700 rounded-t-2xl w-20 h-16 flex flex-col items-center justify-center shadow-lg">
              <span className="text-base font-bold text-white">🥉</span>
              <span className="text-sm font-bold text-white">{mockUsers[2].points}</span>
            </div>
          </motion.div>
        </div>
        )}

        {/* List with sequential animation */}
        {!hasTrips ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-card rounded-2xl p-8 text-center border border-border/50"
          >
            <p className="text-base font-semibold text-foreground mb-2">Start Your Journey!</p>
            <p className="text-sm text-muted-foreground">
              Complete your first commute to join the leaderboard and compete with other eco-warriors.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {mockUsers.map((user, i) => (
              <motion.div
                key={`${user.name}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                className="relative"
              >
                <LeaderboardRow
                  rank={i + 1}
                  name={user.name}
                  points={user.points}
                  isCurrentUser={user.name === "You"}
                />
                {/* Eco Badge for high achievers */}
                <div className="absolute top-3 right-3">
                  <EcoBadge rank={i + 1} points={user.points} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Leaderboard;
