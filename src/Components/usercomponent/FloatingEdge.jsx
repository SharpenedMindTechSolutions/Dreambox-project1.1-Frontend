// components/FloatingEdge.js
import React from 'react';

const FloatingEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
    const edgePath = `M${sourceX},${sourceY} C${sourceX},${(sourceY + targetY) / 2} ${targetX},${(sourceY + targetY) / 2} ${targetX},${targetY}`;
    return (
        <path
            id={id}
            className="react-flow__edge-path stroke-blue-500"
            d={edgePath}
            fill="none"
            strokeWidth={2}
        />
    );
};

export default FloatingEdge;
