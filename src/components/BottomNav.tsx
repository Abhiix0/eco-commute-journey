import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigation, Trophy, LayoutDashboard, Locate } from "lucide-react";

const tabs = [
  { path: "/track", label: "Track", icon: Locate },
  { path: "/leaderboard", label: "Board", icon: Trophy },
  { path: "/dashboard", label: "Stats", icon: LayoutDashboard },
];

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-around max-w-md mx-auto h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-200 ${isActive ? "eco-gradient text-primary-foreground scale-110" : ""}`}>
                <Icon size={20} />
              </div>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
