// // components/NodeDetailDrawer.js
// import { ChevronsUp } from 'lucide-react';
// import React from 'react';

// const NodeDetailDrawer = ({ selectedNode, onClose }) => {
//   if (!selectedNode) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end">
//       <div className="relative bg-white h-full w-full max-w-2xl p-8 animate-slide-in-right overflow-y-auto shadow-2xl">

//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="fixed top-4 right-4 z-50 text-gray-600 hover:text-red-600 text-3xl font-bold"
//           aria-label="Close drawer"
//         >
//           ×
//         </button>

//         <h2 className="text-3xl font-bold mb-4 pt-12 text-black text-start">
//           {selectedNode.title}  
//         </h2>

//         <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-start">
//           Resources
//         </h3>

//         {selectedNode.resources?.length > 0 ? (
//           <div className="flex flex-wrap gap-4">
//             {selectedNode.resources.map((res, idx) => (
//               <div
//                 key={idx}
//                 className="px-4 py-2 border border-blue-100 rounded-lg hover:bg-blue-50 transition max-w-full"
//               >
//                 <div className="flex items-center space-x-2 break-words" >
//                   <a
//                     href={res.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 font-medium"
//                   >
//                     {res.description}
//                   </a>

//                 </div>

//               </div>
//             ))}
//           </div>

//         ) : (
//           <p className="text-gray-500">No resources available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NodeDetailDrawer;



// components/NodeDetailDrawer.js
import { X } from "lucide-react";
import React from "react";

const NodeDetailDrawer = ({ selectedNode, onClose }) => {
  if (!selectedNode) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose} // click outside closes drawer
      ></div>

      {/* Drawer */}
      <div
        className={`
          relative bg-white 
          h-full w-full max-w-2xl p-8 overflow-y-auto shadow-2xl
          z-50
          animate-slide-in-right
          sm:animate-slide-in-bottom
        `}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-20  sm:top-20 right-4 z-50 text-red-400 bg-red-100 hover:text-red-600 p-1 rounded-full"
          aria-label="Close drawer"
        >
          <X size={28} />
        </button>

        {/* Node Title */}
        <h2 className="text-3xl font-bold mb-4 pt-12 text-black">
          {selectedNode.title}
        </h2>

        {/* Resources */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Resources
        </h3>

        {selectedNode.resources?.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {selectedNode.resources.map((res, idx) => (
              <div
                key={idx}
                className="px-4 py-2 border border-blue-100 rounded-lg hover:bg-blue-50 transition max-w-full break-words"
              >
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium break-words"
                >
                  {res.description}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No resources available.</p>
        )}
      </div>
    </div>
  );
};

export default NodeDetailDrawer;

