import React from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp } from "lucide-react";

interface ProjectionCardProps {
  userCarbonSaved: number; // in kg
  multiplier?: number;
}

const ProjectionCard: React.FC<ProjectionCardProps> = ({ userCarbonSaved, multiplier = 1000 }) => {
  const projectedTons = ((userCarbonSaved * multiplier) / 1000).toFixed(1);
  const treesEquivalent = Math.round((userCarbonSaved * multiplier) / 0.5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="glass-card rounded-2xl p-5 shadow-lg border border-primary/20 bg-gradient-to-br from-accent/20 to-transparent"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl eco-gradient shadow-md">
          <Users size={22} className="text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-foreground">Community Impact</h3>
          <p className="text-xs text-muted-foreground">If {multiplier.toLocaleString()} students commute like you</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-xl bg-card/50">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Annual CO₂ Saved</span>
          </div>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1, type: "spring", stiffness: 200 }}
            className="text-xl font-bold eco-text-gradient"
          >
            {projectedTons} tons
          </motion.span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-card/50">
          <div className="flex items-center gap-2">
            <span className="text-base">🌳</span>
            <span className="text-sm font-medium text-muted-foreground">Trees Equivalent</span>
          </div>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.1, type: "spring", stiffness: 200 }}
            className="text-xl font-bold text-foreground"
          >
            {treesEquivalent.toLocaleString()}
          </motion.span>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="text-xs text-muted-foreground mt-4 text-center italic"
      >
        Together, we can make a massive difference! 🌍
      </motion.p>
    </motion.div>
  );
};

export default ProjectionCard;
