
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DreamBoxForm from "./DreamBoxForm";
import PreviousDream from "./PreviousDream";

function MainContent({ currentView, chatSessionId, roadmapid }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <main className="flex-1 flex items-center justify-center min-h-screen">
      <div className="w-full h-full relative">
        {(!isAuthenticated || !["chat", "previous chat"].includes(currentView)) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#575b5f] px-4">
            <motion.h1
              className="text-2xl md:text-4xl font-special-gothic"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Hello, welcome user
            </motion.h1>
            <motion.h2
              className="text-xl md:text-3xl font-special-gothic mt-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              What do you want to build?
            </motion.h2>
          </div>
        )}

        {/* DreamBoxForm View */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isAuthenticated && currentView === "chat" ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
          }`}
        >
          <DreamBoxForm key={chatSessionId} />
        </div>

        {/* PreviousDream View */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            currentView === "previous chat" ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
          }`}
        >
          <PreviousDream key={roadmapid} roadmapid={roadmapid} />
        </div>
      </div>
    </main>
  );
}

export default MainContent;
