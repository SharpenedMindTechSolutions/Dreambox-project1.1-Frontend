// src/pages/Userdashboard.jsx
import React, { useState } from "react";
import Sidebar from "../Components/usercomponent/Sidebar";
import MobileHeader from "../Components/usercomponent/MobileHeader";
import MainContent from "../Components/usercomponent/MainContent";

function Userdashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("chat");
  const [chatSessionId, setChatSessionId] = useState(Date.now());
  const [roadmapid,setRoadmapid] = useState("");

  const handleChildData = (data) => {
    setRoadmapid(data);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);

    if (view === "chat") {
      setChatSessionId(Date.now());
    }

    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen ">
      <MobileHeader onToggleSidebar={toggleSidebar} />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentView={currentView}
        setCurrentView={handleViewChange}
        sendDataToParent={handleChildData} 
      />

      <MainContent
        currentView={currentView}
        chatSessionId={chatSessionId}
        roadmapid={roadmapid}
        
      />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Userdashboard;
