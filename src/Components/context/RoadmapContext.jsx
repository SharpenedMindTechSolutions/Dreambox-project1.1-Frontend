import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const RoadmapContext = createContext();

const API = import.meta.env.VITE_API_URL;


export const RoadmapProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(false);

const transformNodes = (nodes = []) => {
  const colors = ["#2563eb", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6"]; 
  return nodes.map((node, index) => ({
    id: node.id.toString(),
    type: "default",
    data: {
      label: node.title || "No Title",
      fullData: node,
    },
    position: {
      x: node.x ?? Math.random() * 300,
      y: node.y ?? Math.random() * 300,
    },
    style: {
      backgroundColor: colors[index % colors.length], 
      color: "#fff", 
      borderRadius: 8,
      padding: 10,
      border: "2px solid white", 
    },
  }));
};


  const transformEdges = (connections = []) =>
    connections.map((conn, index) => ({
      id: conn._id ? String(conn._id) : `e-${index}`,
      source: String(conn.source),
      target: String(conn.target),
      type: "floating",    
      animated: true,
      style: {
        stroke: "black",  
        strokeWidth: 1,     
      },
    }));

  const generateRoadmap = async ({ careerAspiration, industryField, userId }) => {
    const response = await axios.post(`${API}/api/roadmap/generate-roadmap`, {
      careerAspiration,
      industryField,
      userId,
    });
    return response.data.roadmapId;
    
  };

  const getRoadmapById = async (id, userId) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API}/api/roadmap/${id}`,
        { params: { userId } }
      );

      setNodes(transformNodes(data.nodes));
      setEdges(transformEdges(data.connections));
    } catch (err) {
      console.error("Error fetching roadmap:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserId = () => localStorage.getItem("userId");

  const fetchUserRoadmaps = async () => {
    const userId = getUserId();
    if (!userId) return [];

    try {
      const { data } = await axios.get(
        `${API}/api/roadmap/user/${userId}`
      );
      if (Array.isArray(data)) {
        return data;
      } else if (Array.isArray(data.data)) {
        return data.data;
      } else {
        return [];
      }
    } catch (err) {
      console.error("Error fetching user roadmaps:", err);
      return [];
    }
  };

  const deleteRoadmap = async (roadmapId) => {
    const userId = getUserId();
    try {
      await axios.delete(
        `${API}/api/roadmap/${roadmapId}`,
        { params: { userId } }
      );
      return true;
    } catch (err) {
      console.error("Error deleting roadmap:", err);
      return false;
    }
  };

  const downloadRoadmapPDF = async (roadmapId, title = "roadmap") => {
    const userId = getUserId();
    try {
      const response = await axios.get(
        `${API}/api/roadmap/${roadmapId}/download`,
        {
          params: { userId },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${title.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading roadmap:", error);
      alert("Failed to download roadmap");
    }
  };

  return (
    <RoadmapContext.Provider
      value={{
        nodes,
        edges,
        loading,
        generateRoadmap,
        getRoadmapById,
        setNodes,
        setEdges,
        fetchUserRoadmaps,
        deleteRoadmap,
        downloadRoadmapPDF,
      }}
    >
      {children}
    </RoadmapContext.Provider>
  );
};

export const useRoadmap = () => useContext(RoadmapContext);
