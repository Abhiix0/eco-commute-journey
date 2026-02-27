import React from "react";
import { motion } from "framer-motion";
import { Award, Crown, Star, Zap } from "lucide-react";

interface EcoBadgeProps {
  rank: number;
  points: number;
}

const EcoBadge: React.FC<EcoBadgeProps> = ({ rank, points }) => {
  // Determine badge based on rank and points
  const getBadge = () => {
    if (rank === 1) {
      return { icon: Crown, color: "text-yellow-500", label: "Champion" };
    }
    if (rank <= 3) {
      return { icon: Award, color: "text-amber-600", label: "Elite" };
    }
    if (points >= 2000) {
      return { icon: Star, color: "text-primary", label: "Star" };
    }
    if (points >= 1000) {
      return { icon: Zap, color: "text-primary", label: "Active" };
    }
    return null;
  };

  const badge = getBadge();
  if (!badge) return null;

  const Icon = badge.icon;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.2, rotate: 10 }}
      className="flex items-center justify-center"
      title={badge.label}
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-transparent blur-sm"
        />
        <Icon size={16} className={`${badge.color} relative z-10`} />
      </div>
    </motion.div>
  );
};

export default EcoBadge;
