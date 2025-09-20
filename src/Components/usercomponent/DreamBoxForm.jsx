
import React, { useState, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import FloatingEdge from "./FloatingEdge";
import NodeDetailDrawer from "./NodeDetailDrawer";
import { useRoadmap } from "../context/RoadmapContext.jsx";
import DreamInputForm from "./DreamInputForm.jsx";

const edgeTypes = {
  floating: FloatingEdge,
};

function DreamBoxForm({ selectedChatId }) {
  const [careerAspiration, setCareerAspiration] = useState("");
  const [industryField, setIndustryField] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { roadmapId } = useParams();
  const location = useLocation();
  const {
    nodes,
    edges,
    generateRoadmap,
    getRoadmapById,
    setNodes,
    setEdges,
  } = useRoadmap();

  const getUserIdFromQuery = () => {
    return new URLSearchParams(location.search).get("userId");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    const userId = localStorage.getItem("userId");
    if (!careerAspiration.trim() || !industryField.trim()) {
      return alert("Please fill in both fields.");
    }
    setIsLoading(true);
    try {
      const newRoadmapId = await generateRoadmap({
        careerAspiration,
        industryField,
        userId,
      });
      await getRoadmapById(newRoadmapId, userId);
      setSubmitted(true);
    } catch (err) {
      alert(`Something went wrong: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    const userId = localStorage.getItem("userId");
    setSubmitted(false);
    setCareerAspiration("");
    setIndustryField("");
    setSelectedNode(null);
    setNodes([]);
    setEdges([]);
    navigate(`/dashboard/${userId}`);
  };

  const onNodeClick = (_, node) => {
    setSelectedNode(node.data.fullData);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (roadmapId) {
      const userId = getUserIdFromQuery();
      if (userId) {
        getRoadmapById(roadmapId, userId)
          .then(() => setSubmitted(true))
          .catch(() => alert("Unable to load roadmap."));
      }
    }
  }, [roadmapId, location.search, getRoadmapById]);

  const welcomeMessages = [
    "Let’s Start Your Journey.",
    "Your Future Starts Here.",
    "Unlock What’s Next.",
    "Where should we begin?",
  ];
  const [title, setTitle] = useState(welcomeMessages[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
    setTitle(welcomeMessages[randomIndex]);
  }, []);

  return (
    <ReactFlowProvider>
      <div>
        {submitted ? (
          <div className="relative w-screen h-screen">
            <ReactFlow
              nodes={nodes}
              edges={edges.map(edge => ({
                ...edge,

                animated: true,
                style: {
                  stroke: "#FF5733",
                  strokeWidth: 2,
                }, 
              }))}
              onNodeClick={onNodeClick}
              fitView
              edgeTypes={edgeTypes}
              className="w-screen h-screen"
              panOnDrag
              zoomOnScroll
              panOnScroll
              zoomOnPinch
            >
              <Background />
              <MiniMap />
              <Controls />
            </ReactFlow>


            <button
              onClick={handleBack}
              className="absolute top-20 left-4 bg-white text-blue-600 border border-blue-500 px-4 py-2 rounded-lg shadow hover:bg-blue-50"
            >
              ← Back
            </button>

            <NodeDetailDrawer
              selectedNode={selectedNode}
              onClose={() => setSelectedNode(null)}
            />
          </div>
        ) : (

          <DreamInputForm
            careerAspiration={careerAspiration}
            setCareerAspiration={setCareerAspiration}
            industryField={industryField}
            setIndustryField={setIndustryField}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            title={title}
          />
        )}
      </div>
    </ReactFlowProvider>
  );
}

export default DreamBoxForm;
