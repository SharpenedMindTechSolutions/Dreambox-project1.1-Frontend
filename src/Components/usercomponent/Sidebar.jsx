

import React, { useEffect, useState } from "react";
import { LogOut, MessageSquare, Plus, Trash2, Download } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRoadmap } from "../context/RoadmapContext";
import Modal from "./Modal";
import logo from "../../assets/logo.png";

const Sidebar = ({ isOpen, onClose, currentView, setCurrentView, sendDataToParent }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: "", message: "", onConfirm: null });
  const { roadmapId } = useParams();
  const location = useLocation();
  const { fetchUserRoadmaps, deleteRoadmap, downloadRoadmapPDF } = useRoadmap();

  const handleItemClick = (id, chatId) => {
    setCurrentView(id);
    const userId = localStorage.getItem("userId");
    if (id === "chat") {
      setSelectedChatId(null);
      navigate(`/dashboard/${userId}`, {
        state: { fromSidebar: true, roadmapId: chatId },
      });
    }

    if (id === "previous chat") {
      setSelectedChatId(chatId);
      sendDataToParent(chatId);
      navigate(`/dashboard/${chatId}`, {
        state: { fromSidebar: true, roadmapId: chatId },
      });
    }
    if (window.innerWidth < 768) onClose?.();
  };

  const loadChats = async () => {
    const result = await fetchUserRoadmaps();
    setChats(result);
  };


  useEffect(() => {
    loadChats(); // run immediately
    const interval = setInterval(() => {
      loadChats();
    }, 10000);

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    if (roadmapId) {
      loadChats();
      setSelectedChatId(roadmapId);
    }
  }, [roadmapId, location.search]);

  const handleDownload = async (roadmapId, title = "roadmap") => {
    await downloadRoadmapPDF(roadmapId, title);
  };

  const confirmDelete = (id) => {
    setModalInfo({
      title: "Delete Roadmap",
      message: "Are you sure you want to delete this roadmap?",
      onConfirm: () => handleDelete(id),
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    setShowModal(false);
    const success = await deleteRoadmap(id);
    if (success) {
      setChats((prev) => prev.filter((chat) => chat._id !== id));
      if (selectedChatId === id) setSelectedChatId(null);
    } else {
      setModalInfo({
        title: "Deletion Failed",
        message: "Failed to delete roadmap. Please try again.",
        onConfirm: () => setShowModal(false),
      });
      setShowModal(true);
    }
  };

  return (
    <>
      <aside
        className={`fixed md:relative top-0 left-0 z-50 w-62 h-full bg-slate-100
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        flex flex-col`}
      >
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-6 w-6 object-contain" />
            <h1 className="text-[20px] font-semibold text-[#575b5f]">Dream Box AI</h1>
          </div>
        </header>

        <nav className="flex-1 overflow-y-auto w-56">
          <div className="p-2">
            <button
              onClick={() => handleItemClick("chat")}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-300 mb-4 transition-colors duration-200"
            >
              <Plus className="w-4 h-4 text-[#575b5f]" />
              <span className="text-sm text-[#575b5f]">New Dream</span>
            </button>

            <div className="mt-3">
              <h3 className="px-3 py-2 text-xs font-medium text-chat-text-secondary uppercase tracking-wider">
                Dreams
              </h3>

              <div className="max-h-[360px] overflow-y-auto pr-1">
                {Array.isArray(chats) && chats.length > 0 ? (
                  chats.map((chat) => (
                    <div
                      key={chat._id}
                      className={`group relative flex items-center px-3 py-2 rounded-lg transition-colors 
                        ${selectedChatId === chat._id ? "bg-white" : "hover:bg-gray-200"}`}
                    >
                      <div
                        onClick={() => handleItemClick("previous chat", chat._id)}
                        className="flex items-center space-x-3 text-left cursor-pointer w-full"
                      >
                        <MessageSquare className="w-4 h-4 text-[#575b5f]" />
                        <span className="text-sm truncate text-[#575b5f] max-w-[160px]">
                          {chat?.careerAspiration
                            ? chat.careerAspiration.length > 15
                              ? chat.careerAspiration.slice(0, 15) + "..."
                              : chat.careerAspiration
                            : "Untitled"}
                        </span>
                      </div>

                      <div
                        className={`ml-auto flex gap-2 items-center ${selectedChatId === chat._id ? "" : "hidden group-hover:flex"}`}
                      >
                        <button
                          title="Download"
                          onClick={() => handleDownload(chat._id, chat.careerAspiration)}
                        >
                          <Download className="w-4 h-4 text-blue-500 hover:text-blue-700" />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => confirmDelete(chat._id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No previous dreams yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        <footer className="p-4 border-t">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 text-sm text-left text-red-500 px-3 py-2 hover:bg-red-100 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </footer>
      </aside>

      {/* Reusable Modal */}
      <Modal
        isOpen={showModal}
        title={modalInfo.title}
        message={modalInfo.message}
        onConfirm={modalInfo.onConfirm}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

export default Sidebar;
