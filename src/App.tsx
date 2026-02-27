import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { StatsProvider } from "@/contexts/StatsContext";
import Index from "./pages/Index";
import Track from "./pages/Track";
import Summary from "./pages/Summary";
import Leaderboard from "./pages/Leaderboard";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Page transition variants
const pageVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
  }),
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -100 : 100,
  }),
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  // Determine direction based on route
  const getDirection = (pathname: string) => {
    const routes = ["/", "/track", "/summary", "/leaderboard", "/dashboard"];
    const currentIndex = routes.indexOf(pathname);
    const prevIndex = routes.indexOf(location.pathname);
    return currentIndex > prevIndex ? 1 : -1;
  };
  
  return (
    <AnimatePresence mode="wait" custom={getDirection(location.pathname)}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              custom={getDirection("/")}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Index />
            </motion.div>
          }
        />
        <Route
          path="/track"
          element={
            <motion.div
              custom={getDirection("/track")}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Track />
            </motion.div>
          }
        />
        <Route
          path="/summary"
          element={
            <motion.div
              custom={getDirection("/summary")}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Summary />
            </motion.div>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <motion.div
              custom={getDirection("/leaderboard")}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Leaderboard />
            </motion.div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <motion.div
              custom={getDirection("/dashboard")}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Dashboard />
            </motion.div>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <StatsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </StatsProvider>
  </QueryClientProvider>
);

export default App;
