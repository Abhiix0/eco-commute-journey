import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, TreePine, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

const Home: React.FC = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) {
      navigate("/track", { state: { name: name.trim() } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-gradient-to-br from-background via-accent/5 to-background">
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0, y: -20, rotate: -45 }}
        animate={{ opacity: 0.15, y: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-12 left-8 text-eco-leaf"
      >
        <motion.div
          animate={{ rotate: [0, 10, 0], y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Leaf size={48} />
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: -20, rotate: 45 }}
        animate={{ opacity: 0.12, y: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-24 right-10 text-eco-green"
      >
        <motion.div
          animate={{ rotate: [0, -5, 0], y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <TreePine size={60} />
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -30 }}
        animate={{ opacity: 0.12, y: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute bottom-40 left-12 text-eco-lime"
      >
        <motion.div
          animate={{ rotate: [0, 15, 0], y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Sprout size={42} />
        </motion.div>
      </motion.div>

      {/* Main content */}
      <div className="w-full max-w-sm flex flex-col items-center gap-10 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 eco-gradient blur-2xl rounded-full"
          />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl eco-gradient shadow-2xl">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Leaf size={44} className="text-primary-foreground" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center space-y-3"
        >
          <h1 className="text-4xl font-extrabold tracking-tight eco-text-gradient">
            Green Commute
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Track your commute. Save carbon.<br />Earn eco-points. 🌱
          </p>
        </motion.div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full space-y-5"
        >
          <motion.div whileFocus={{ scale: 1.02 }}>
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleStart()}
              className="h-14 rounded-2xl text-base text-center border-2 border-border/50 focus-visible:border-primary focus-visible:ring-primary/20 shadow-sm"
            />
          </motion.div>
          
          <motion.button
            onClick={handleStart}
            disabled={!name.trim()}
            whileTap={{ scale: 0.98 }}
            whileHover={name.trim() ? { scale: 1.02 } : {}}
            className={`w-full py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-300 ease-in-out flex items-center justify-center gap-3 ${
              name.trim()
                ? "eco-gradient text-primary-foreground shadow-xl hover:shadow-2xl glow-hover"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            🚀 Start Commuting
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
