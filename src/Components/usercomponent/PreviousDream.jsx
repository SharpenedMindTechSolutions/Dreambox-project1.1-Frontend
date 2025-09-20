
import React, { useEffect, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";
import NodeDetailDrawer from "./NodeDetailDrawer";

const API = "https://dream-box-project.onrender.com";

function PreviousDream({ roadmapid }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

const transformNodes = (nodes = []) => {
  const colors = ["#2563eb", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6"]; 
  // blue, red, amber, green, violet

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
      backgroundColor: colors[index % colors.length], // 🎨 cycle colors
      color: "#fff", // text color
      borderRadius: 8,
      padding: 10,
      border: "2px solid white", // optional border
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


  useEffect(() => {
    const fetchRoadmap = async () => {
      const userId = localStorage.getItem("userId");
      if (!roadmapid || !userId) {
        console.warn("roadmapid or userId missing");
        return;
      }
      setLoading(true);
      try {
        const res = await axios.get(`${API}/api/roadmap/${roadmapid}`, {
          params: { userId },
        });
        const data = res.data;
        setNodes(transformNodes(data.nodes || []));
        setEdges(transformEdges(data.connections || []));
      } catch (err) {
        console.error("Error fetching roadmap:", err);
        setNodes([]);
        setEdges([]);
      } finally {
        setLoading(false);
      }
    };

    if (roadmapid) {
      fetchRoadmap();
    }
  }, [roadmapid]);

  const handleNodeClick = (_, node) => {
    setSelectedNode(node.data.fullData);
  };

  return (
    <ReactFlowProvider>
      <div className="w-full h-screen bg-white">
        {loading && (
          <div className="flex justify-center items-center h-full">
            <p>Loading...</p>
          </div>
        )}

        {!loading && nodes.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <p>No roadmap found.</p>
          </div>
        )}

        {!loading && nodes.length > 0 && (
          <div className="w-full h-full relative">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodeClick={handleNodeClick}
              fitView
              className="w-full h-full"
            >
              <Background />
              <MiniMap />
              <Controls />
            </ReactFlow>

            <NodeDetailDrawer
              selectedNode={selectedNode}
              onClose={() => setSelectedNode(null)}
            />
          </div>
        )}
      </div>
    </ReactFlowProvider>
  );
}

export default PreviousDream;
