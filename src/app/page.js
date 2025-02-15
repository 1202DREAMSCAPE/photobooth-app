"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [showWarning, setShowWarning] = useState(false);
  const [userIgnored, setUserIgnored] = useState(false);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth > 768) {
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const startCountdown = () => {
    setIsCurtainOpen(true);
    setCountdown(3);

    let timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          triggerFlash();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
  };

  return (
    <div className="relative min-h-screen bg-[#410B13] flex flex-col items-center justify-center text-white font-inter">
      {/* Title */}
      <h1 className="text-3xl font-extrabold tracking-widest absolute top-6 text-[#CD5D67]">
        PHOTOBOOTH
      </h1>

      {/* Photobooth Frame */}
      <div className="relative w-[95%] max-w-[500px] h-[78vh] flex flex-row bg-[#421820] rounded-lg shadow-lg">
        {/* Left Sidebar (Start Button & Seat) */}
        <div className="relative w-[35%] flex flex-col items-center justify-between py-8 px-4">
          <div className="absolute inset-0 bg-[#91171F] -ml-6 w-[120%] h-full"></div>

          {/* Start Button */}
          <motion.button
            className="relative mt-auto mb-8 flex items-center justify-center gap-2 px-8 py-3 bg-[#BA1F33] text-lg font-semibold uppercase rounded-lg shadow-md
                       hover:bg-[#CD5D67] hover:shadow-[0px_0px_20px_#CD5D67] transition-all duration-200 ease-in-out z-10 w-full max-w-[160px] text-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={startCountdown}
          >
            🔴 <span>Start</span>
          </motion.button>

          {/* Embedded SVG (Box Below Start Button) */}
          <div className="relative w-[69.9px] h-[131.1px] flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="132"
              viewBox="0 0 70 132"
              fill="none"
            >
              <rect
                x="69.209"
                width="130.764"
                height="69.21"
                rx="6"
                transform="rotate(89.6936 69.209 0)"
                fill="#651E2B"
              />
              <g filter="url(#filter0_i_1_23)">
                <rect
                  x="60.7782"
                  y="9.71136"
                  width="113.203"
                  height="52.7186"
                  rx="6"
                  transform="rotate(89.6936 60.7782 9.71136)"
                  fill="#BA1F33"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Curtain Area */}
        <div className="w-[65%] relative flex items-center justify-center overflow-hidden bg-[#2D1215] rounded-r-lg">
          {/* Left Curtain */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#000000] to-[#410B13]"
            initial={{ x: 0 }}
            animate={{ x: isCurtainOpen ? "-100%" : "0%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          {/* Right Curtain */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#000000] to-[#410B13]"
            initial={{ x: 0 }}
            animate={{ x: isCurtainOpen ? "100%" : "0%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Countdown Overlay */}
          {countdown !== null && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <motion.div
                key={countdown}
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-6xl font-bold text-white"
              >
                {countdown}
              </motion.div>
            </div>
          )}

          {/* Flash Effect */}
          {flash && (
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
      </div>

      {/* Checkered Floor */}
      <div className="w-full h-[50px] bg-[url('/checkered-floor.png')] bg-cover absolute bottom-0"></div>
    </div>
  );
}
