import React from "react";
import { motion } from "framer-motion";
import { TreePine, Car, Lightbulb, Home } from "lucide-react";

interface EquivalentItem {
  icon: React.ElementType;
  value: string;
  description: string;
}

interface ImpactEquivalentProps {
  carbonSaved: number; // in kg
}

const ImpactEquivalent: React.FC<ImpactEquivalentProps> = ({ carbonSaved }) => {
  // Calculate equivalents
  const treesPlanted = Math.round(carbonSaved / 0.5); // ~0.5kg CO2 per tree per month
  const carKm = Math.round(carbonSaved / 0.21); // 0.21kg CO2 per km
  const lightbulbHours = Math.round(carbonSaved / 0.05); // ~0.05kg CO2 per hour
  const homeHours = Math.round(carbonSaved / 0.5); // ~0.5kg CO2 per hour

  const equivalents: EquivalentItem[] = [
    {
      icon: TreePine,
      value: `${treesPlanted}`,
      description: "trees planted",
    },
    {
      icon: Car,
      value: `${carKm} km`,
      description: "car travel avoided",
    },
    {
      icon: Lightbulb,
      value: `${lightbulbHours}h`,
      description: "LED bulb runtime",
    },
    {
      icon: Home,
      value: `${homeHours}h`,
      description: "home energy saved",
    },
  ];

  return (
    <div className="glass-card rounded-2xl p-5 shadow-lg border border-border/50">
      <h3 className="text-base font-bold text-foreground mb-4">Your Impact Equivalent</h3>
      <div className="grid grid-cols-2 gap-4">
        {equivalents.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1, type: "spring", stiffness: 150 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-accent/30 border border-border/30"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl eco-gradient-light">
                <Icon size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-foreground">{item.value}</p>
                <p className="text-xs text-muted-foreground leading-tight">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ImpactEquivalent;
