import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  className?: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, unit, className = "", delay = 0 }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-card p-4 shadow-md border border-border opacity-0 animate-float-up ${
        delay === 1 ? "stagger-1" : delay === 2 ? "stagger-2" : delay === 3 ? "stagger-3" : ""
      } ${className}`}
    >
      <div className="absolute top-0 right-0 w-20 h-20 eco-gradient-light rounded-bl-full opacity-60" />
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl eco-gradient text-primary-foreground">
          <Icon size={20} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-foreground">
            {value}
            {unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
