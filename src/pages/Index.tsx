import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, TreePine, Sprout } from "lucide-react";
import { Input } from "@/components/ui/input";
import PrimaryButton from "@/components/PrimaryButton";

const Home: React.FC = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) {
      navigate("/track", { state: { name: name.trim() } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-6 text-eco-leaf opacity-20 animate-float-up">
        <Leaf size={40} />
      </div>
      <div className="absolute top-20 right-8 text-eco-green opacity-15 animate-float-up stagger-1">
        <TreePine size={50} />
      </div>
      <div className="absolute bottom-32 left-10 text-eco-lime opacity-15 animate-float-up stagger-2">
        <Sprout size={35} />
      </div>

      {/* Main content */}
      <div className="w-full max-w-sm flex flex-col items-center gap-8 opacity-0 animate-float-up">
        {/* Logo */}
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl eco-gradient shadow-xl">
          <Leaf size={36} className="text-primary-foreground" />
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight eco-text-gradient">
            Green Commute
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Track your commute. Save carbon.<br />Earn eco-points. 🌱
          </p>
        </div>

        {/* Input */}
        <div className="w-full space-y-4">
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
            className="h-12 rounded-xl text-base text-center border-2 border-border focus-visible:border-primary focus-visible:ring-primary/20"
          />
          <PrimaryButton onClick={handleStart} disabled={!name.trim()}>
            🚀 Start Commuting
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Home;
