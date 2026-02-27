import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LiveMapContainer from "@/components/LiveMapContainer";
import FloatingTrackerCard from "@/components/FloatingTrackerCard";
import ModeChips from "@/components/ModeChips";
import BottomNav from "@/components/BottomNav";
import {
  calculateDistance,
  calculateTotalDistance,
  calculateAverageSpeed,
  detectTransportMode,
  calculateCO2Saved,
  formatTime,
  getGeolocationErrorMessage,
} from "@/lib/geolocation";

interface Coordinate {
  lat: number;
  lng: number;
}

const MAX_DISTANCE_JUMP = 0.2; // 200 meters - filter unrealistic GPS jumps

const Track: React.FC = () => {
  const navigate = useNavigate();
  const [tracking, setTracking] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [path, setPath] = useState<Coordinate[]>([]);
  const [currentPosition, setCurrentPosition] = useState<Coordinate | null>(null);
  const [selectedMode, setSelectedMode] = useState("walk");
  const [error, setError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [isAcquiringGPS, setIsAcquiringGPS] = useState(false);
  
  const watchIdRef = useRef<number | null>(null);
  const lastPositionRef = useRef<Coordinate | null>(null);

  // Calculate metrics
  const distance = calculateTotalDistance(path);
  const avgSpeed = calculateAverageSpeed(distance, seconds);
  const detectedMode = seconds > 10 ? detectTransportMode(avgSpeed) : selectedMode;
  const co2Saved = calculateCO2Saved(distance);

  // Timer
  useEffect(() => {
    if (!tracking) return;
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [tracking]);

  // Geolocation tracking
  useEffect(() => {
    if (!tracking) {
      // Stop watching position
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      lastPositionRef.current = null;
      setIsAcquiringGPS(false);
      return;
    }

    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setTracking(false);
      return;
    }

    setIsAcquiringGPS(true);

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    const successCallback = (position: GeolocationPosition) => {
      const newCoord: Coordinate = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      // Filter unrealistic GPS jumps
      if (lastPositionRef.current) {
        const distanceFromLast = calculateDistance(
          lastPositionRef.current.lat,
          lastPositionRef.current.lng,
          newCoord.lat,
          newCoord.lng
        );

        // Ignore if jump is too large (likely GPS error)
        if (distanceFromLast > MAX_DISTANCE_JUMP) {
          console.warn(`GPS jump filtered: ${distanceFromLast.toFixed(3)} km`);
          return;
        }
      }

      setCurrentPosition(newCoord);
      setPath((prevPath) => [...prevPath, newCoord]);
      lastPositionRef.current = newCoord;
      setError(null);
      setPermissionDenied(false);
      setIsAcquiringGPS(false);
    };

    const errorCallback = (err: GeolocationPositionError) => {
      console.error("Geolocation error:", err);
      setIsAcquiringGPS(false);
      
      const errorMsg = getGeolocationErrorMessage(err);
      setError(errorMsg);
      
      if (err.code === err.PERMISSION_DENIED) {
        setPermissionDenied(true);
        setTracking(false);
        if (watchIdRef.current !== null) {
          navigator.geolocation.clearWatch(watchIdRef.current);
          watchIdRef.current = null;
        }
      }
    };

    // Get initial position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialCoord: Coordinate = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentPosition(initialCoord);
        setPath([initialCoord]);
        lastPositionRef.current = initialCoord;
        setError(null);
        setIsAcquiringGPS(false);
      },
      (err) => {
        console.warn("Initial position failed:", err);
        setIsAcquiringGPS(false);
      },
      options
    );

    // Start continuous watching
    watchIdRef.current = navigator.geolocation.watchPosition(
      successCallback,
      errorCallback,
      options
    );

    // Cleanup
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [tracking]);

  const handleStart = () => {
    setTracking(true);
    setSeconds(0);
    setPath([]);
    setCurrentPosition(null);
    setError(null);
    setPermissionDenied(false);
    lastPositionRef.current = null;
  };

  const handleStop = () => {
    setTracking(false);
    if (distance > 0) {
      navigate("/summary", {
        state: {
          distance: distance.toFixed(2),
          time: seconds,
          mode: detectedMode,
          co2Saved: co2Saved.toFixed(2),
        },
      });
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8 bg-gradient-to-b from-background to-accent/20 relative overflow-hidden">
      {/* Map Container */}
      <LiveMapContainer
        tracking={tracking}
        currentPosition={currentPosition}
        path={path}
      />

      {/* Error Banner - Fixed positioning */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-20 left-4 right-4 z-50"
          >
            <div className="max-w-md mx-auto glass-card rounded-2xl p-4 shadow-2xl border-2 border-destructive/50 bg-destructive/10">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-destructive mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground mb-1">Location Error</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{error}</p>
                  {permissionDenied && (
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      Please enable location permissions in your browser settings.
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GPS Acquiring Banner */}
      <AnimatePresence>
        {isAcquiringGPS && !error && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-20 left-4 right-4 z-50"
          >
            <div className="max-w-md mx-auto glass-card rounded-2xl p-4 shadow-xl border border-primary/50 bg-primary/5">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="text-primary"
                >
                  📡
                </motion.div>
                <p className="text-sm font-semibold text-foreground">Acquiring GPS signal...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Tracker Card - Better positioning */}
      <AnimatePresence>
        {tracking && (
          <FloatingTrackerCard
            duration={formatTime(seconds)}
            distance={distance}
            co2Saved={co2Saved}
            detectedMode={detectedMode}
          />
        )}
      </AnimatePresence>

      {/* Mode Selector (when not tracking) - Better spacing */}
      <AnimatePresence>
        {!tracking && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-28 left-4 right-4 z-20"
          >
            <div className="max-w-md mx-auto glass-card rounded-2xl p-5 shadow-xl border border-border/50">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                Select Transport Mode
              </p>
              <ModeChips selectedMode={selectedMode} onModeChange={setSelectedMode} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start/Stop Button - Fixed positioning at bottom */}
      <div className="fixed bottom-8 left-4 right-4 z-30">
        <div className="max-w-md mx-auto">
          {!tracking ? (
            <motion.button
              onClick={handleStart}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              disabled={permissionDenied}
              className={`relative w-full py-5 px-8 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 ease-in-out flex items-center justify-center gap-3 overflow-hidden ${
                permissionDenied
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "eco-gradient text-primary-foreground glow-hover"
              }`}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Zap size={24} />
              </motion.div>
              Start Commute
              {/* Ripple effect */}
              <motion.span
                className="absolute inset-0 bg-white/20 rounded-2xl"
                initial={{ scale: 0, opacity: 0.5 }}
                whileTap={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          ) : (
            <motion.button
              onClick={handleStop}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              className="w-full py-5 px-8 rounded-2xl font-bold text-lg border-2 border-primary text-primary glass-card shadow-2xl hover:bg-primary/5 transition-all duration-300 ease-in-out flex items-center justify-center gap-3"
            >
              ⏹ Stop Commute
            </motion.button>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Track;
