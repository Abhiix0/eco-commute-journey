import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bike, Bus, Car, Footprints, TrainFront, PersonStanding } from "lucide-react";

const modes = [
  { value: "walk", label: "Walk", icon: Footprints },
  { value: "cycle", label: "Cycle", icon: Bike },
  { value: "bus", label: "Bus", icon: Bus },
  { value: "metro", label: "Metro", icon: TrainFront },
  { value: "bike", label: "Bike", icon: PersonStanding },
  { value: "car", label: "Car", icon: Car },
];

interface ModeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full rounded-xl h-12 text-base">
        <SelectValue placeholder="Select transport mode" />
      </SelectTrigger>
      <SelectContent>
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <SelectItem key={mode.value} value={mode.value}>
              <span className="flex items-center gap-2">
                <Icon size={16} />
                {mode.label}
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default ModeSelector;
