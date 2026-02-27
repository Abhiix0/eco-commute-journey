import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Trophy, LayoutDashboard, Locate } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { path: "/track", label: "Track", icon: Locate },
  { path: "/leaderboard", label: "Board", icon: Trophy },
  { path: "/dashboard", label: "Stats", icon: LayoutDashboard },
];

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeIndex = tabs.findIndex((tab) => tab.path === location.pathname);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-safe"
    >
      <div className="w-full max-w-md mx-4 relative glass-card rounded-b-3xl shadow-2xl border-b border-border/50">
        {/* Animated sliding pill indicator */}
        {activeIndex !== -1 && (
          <motion.div
            className="absolute top-3 bottom-3 rounded-2xl eco-gradient"
            initial={false}
            animate={{
              left: `calc(${(activeIndex * 100) / tabs.length}% + 0.75rem)`,
              width: `calc(${100 / tabs.length}% - 1.5rem)`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
        )}

        <div className="relative flex items-stretch justify-between px-3 py-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;
            
            return (
              <motion.button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                whileTap={{ scale: 0.95 }}
                className={`relative flex flex-col items-center justify-center gap-1 flex-1 py-2 rounded-2xl transition-colors duration-300 ease-in-out z-10 ${
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[10px] font-semibold tracking-wide ${isActive ? "opacity-100" : "opacity-70"}`}>
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default BottomNav;
