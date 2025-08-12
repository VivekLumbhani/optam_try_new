import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge
} from "reactflow";
import "reactflow/dist/style.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

// Enhanced node data with detailed information
const nodeDetails = {
  "A0": {
    id: "A0",
    name: "Design Requirements",
    description: "Define standards, production controls, and specifications for the manufacturing process",
    date: "2025-01-15",
    dependencies: ["Quality Standards", "Safety Protocols"],
    type: "Input"
  },
  "A1": {
    id: "A1", 
    name: "CAD Model",
    description: "3D computer-aided design model creation and validation",
    date: "2025-02-01",
    dependencies: ["Design Requirements", "Material Properties"],
    type: "Design"
  },
  "A2": {
    id: "A2",
    name: "Plan Process (Machine Independent)",
    description: "General manufacturing process planning without specific machine constraints",
    date: "2025-02-10",
    dependencies: ["CAD Model", "Manufacturing Standards"],
    type: "Planning"
  },
  "A3": {
    id: "A3",
    name: "Plan Process (Machine Dependent)", 
    description: "Specific manufacturing process planning for selected machinery",
    date: "2025-02-15",
    dependencies: ["Machine Independent Plan", "Equipment Specifications"],
    type: "Planning"
  },
  "A4": {
    id: "A4",
    name: "AM Build",
    description: "Additive manufacturing build process execution",
    date: "2025-02-20",
    dependencies: ["Machine Dependent Plan", "Raw Materials"],
    type: "Manufacturing"
  },
  "A5": {
    id: "A5",
    name: "Post-Process Workpiece",
    description: "Post-processing operations including cleaning, curing, and finishing",
    date: "2025-02-25",
    dependencies: ["AM Build", "Finishing Standards"],
    type: "Processing"
  },
  "A6": {
    id: "A6",
    name: "Evaluate Part",
    description: "Quality control and evaluation of manufactured part",
    date: "2025-03-01",
    dependencies: ["Post-Process Workpiece", "Quality Metrics"],
    type: "Quality Control"
  },
  "A7": {
    id: "A7",
    name: "Material Selection",
    description: "Selection of appropriate materials for the manufacturing process",
    date: "2025-01-20",
    dependencies: ["Design Requirements"],
    type: "Input"
  },
  "A8": {
    id: "A8",
    name: "Quality Standards",
    description: "Definition of quality standards and acceptance criteria",
    date: "2025-01-18",
    dependencies: ["Design Requirements"],
    type: "Standards"
  }
};

const initialNodes = [
  { 
    id: "A0", 
    position: { x: 50, y: 50 }, 
    data: { 
      label: (
        <>
          Design Requirements
          <br/>
          <small style={{color: '#666'}}>Standards, Production Controls</small>
        </>
      )
    }, 
    style: { 
      border: "2px solid #333", 
      padding: '12px', 
      borderRadius: 8, 
      background: "#f8f9fa",
      minWidth: 160,
      textAlign: 'center',
      cursor: 'pointer'
    }
  },
  { 
    id: "A1", 
    position: { x: 300, y: 50 }, 
    data: { label: "CAD Model" }, 
    style: { 
      border: "2px solid #333", 
      padding: '12px', 
      borderRadius: 8, 
      background: "#f8f9fa",
      minWidth: 120,
      textAlign: 'center',
      cursor: 'pointer'
    }
  },
  { 
    id: "A7", 
    position: { x: 50, y: 180 }, 
    data: { label: "Material Selection" }, 
    style: { 
      border: "2px solid #333", 
      padding: '12px', 
      borderRadius: 8, 
      background: "#e3f2fd",
      minWidth: 140,
      textAlign: 'center',
      cursor: 'pointer'
    }
  },
  { 
    id: "A8", 
    position: { x: 50, y: 320 }, 
    data: { label: "Quality Standards" }, 
    style: { 
      border: "2px solid #333", 
      padding: '12px', 
      borderRadius: 8, 
      background: "#fff3e0",
      minWidth: 140,
      textAlign: 'center',
      cursor: 'pointer'
    }
  },
  { 
    id: "A2", 
    position: { x: 550, y: 50 }, 
    data: { 
      label: (
        <>
          Plan Process
          <br/>
          <small style={{color: '#666'}}>(Machine Independent)</small>
        </>
      )
    }, 
    style: { 
      border: "2px solid #333", 
      padding: '12px', 
      borderRadius: 8, 
      background: "#f8f9fa",
      minWidth: 160,
      textAlign: 'center',
      cursor: 'pointer'
    }
  },
  { 
    id: "A3", 
    position: { x: 800, y: 50 }, 
    data: { 
      label: (
        <>
          Plan Process
          <br/>
          <small style={{color: '#666'}}>(Machine Dependent)</small>
        </>
      )
    }, 
    style: { 
      border: "2px solid #333", 
      padding: '12px', 
      borderRadius: 8, 
      background: "#f8f9fa",
      minWidth: 160,
      textAlign: 'center',
      cursor: 'pointer'
    }
  },
  { 
    id: "A4", 
    position: { x: 800, y: 220 }, 
    data: { label: "AM Build" }, 
    style: { 
      borderRadius: 8, 
      padding: '12px', 
      background: "#2c3e50", 
      color: "#fff",
      minWidth: 120,
      textAlign: 'center',
      cursor: 'pointer',
      fontWeight: 'bold'
    }
  },
  { 
    id: "A5", 
    position: { x: 800, y: 380 }, 
    data: { label: "Post-Process Workpiece" }, 
    style: { 
      border: "2px solid #333", 
      padding: '12px', 
      borderRadius: 8, 
      background: "#f8f9fa",
      minWidth: 170,
      textAlign: 'center',
      cursor: 'pointer'
    }
  },
  { 
    id: "A6", 
    position: { x: 550, y: 380 }, 
    data: { label: "Evaluate Part" }, 
    style: { 
      border: "2px solid #333", 
      padding: '12px', 
      borderRadius: 8, 
      background: "#e8f5e8",
      minWidth: 120,
      textAlign: 'center',
      cursor: 'pointer'
    }
  }
];

const initialEdges = [
  // Main workflow path
  { id: "e0-1", source: "A0", target: "A1", animated: true, style: { stroke: "#e74c3c", strokeWidth: 2 }},
  { id: "e1-2", source: "A1", target: "A2", animated: true, style: { stroke: "#e74c3c", strokeWidth: 2 }},
  { id: "e2-3", source: "A2", target: "A3", animated: true, style: { stroke: "#e74c3c", strokeWidth: 2 }},
  { id: "e3-4", source: "A3", target: "A4", animated: true, style: { stroke: "#e74c3c", strokeWidth: 2 }},
  { id: "e4-5", source: "A4", target: "A5", animated: true, style: { stroke: "#e74c3c", strokeWidth: 2 }},
  { id: "e5-6", source: "A5", target: "A6", animated: true, style: { stroke: "#e74c3c", strokeWidth: 2 }},
  
  // Additional interconnections (no duplicates)
  { id: "e0-7", source: "A0", target: "A7", animated: false, style: { stroke: "#3498db", strokeWidth: 1, strokeDasharray: "5,5" }},
  { id: "e0-8", source: "A0", target: "A8", animated: false, style: { stroke: "#3498db", strokeWidth: 1, strokeDasharray: "5,5" }},
  { id: "e7-1", source: "A7", target: "A1", animated: false, style: { stroke: "#9b59b6", strokeWidth: 1, strokeDasharray: "5,5" }},
  { id: "e8-6", source: "A8", target: "A6", animated: false, style: { stroke: "#f39c12", strokeWidth: 1, strokeDasharray: "5,5" }},
  { id: "e6-0", source: "A6", target: "A0", animated: false, style: { stroke: "#27ae60", strokeWidth: 1, strokeDasharray: "5,5" }, label: "Feedback"},
  { id: "e2-7", source: "A2", target: "A7", animated: false, style: { stroke: "#e67e22", strokeWidth: 1, strokeDasharray: "3,3" }},
  { id: "e8-2", source: "A8", target: "A2", animated: false, style: { stroke: "#8e44ad", strokeWidth: 1, strokeDasharray: "3,3" }}
];

const WorkflowDiagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [detailsPosition, setDetailsPosition] = useState({ x: 0, y: 0 });
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: "#e74c3c", strokeWidth: 2 } }, eds)),
    []
  );

  const onNodeClick = useCallback((event, node) => {
    if (reactFlowInstance) {
      // Get the ReactFlow viewport and transform
      const { x: viewportX, y: viewportY, zoom } = reactFlowInstance.getViewport();
      
      // Calculate the screen position of the node
      const screenX = (node.position.x + viewportX) * zoom;
      const screenY = (node.position.y + viewportY) * zoom;
      
      setSelectedNode(nodeDetails[node.id]);
      setDetailsPosition({
        x: screenX + 180, // Offset to position next to the node
        y: screenY - 50   // Offset upward
      });
    }
  }, [reactFlowInstance]);

  const closeDetails = () => {
    setSelectedNode(null);
  };

  const onInit = useCallback((instance) => {
    setReactFlowInstance(instance);
  }, []);

  return (
    <Card className="w-full h-[700px]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          AM Workflow - Enhanced IDEFO Diagram
        </CardTitle>
        <p className="text-sm text-gray-600">Click on any node to view detailed information</p>
      </CardHeader>
      <CardContent className="h-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onInit={onInit}
          fitView
          fitViewOptions={{ padding: 0.1 }}
        >
          <MiniMap 
            nodeStrokeColor="#333"
            nodeColor="#f8f9fa"
            nodeBorderRadius={8}
            maskColor="rgba(0, 0, 0, 0.1)"
            position="top-right"
          />
          <Controls position="top-left" />
          <Background gap={20} color="#e0e0e0" variant="dots" />
        </ReactFlow>

        {/* Node Details Panel - positioned over the clicked node */}
        {selectedNode && (
          <div 
            className="absolute w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50 pointer-events-auto"
            style={{
              left: `${detailsPosition.x}px`,
              top: `${detailsPosition.y}px`
            }}
          >
            <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <h3 className="text-base font-semibold text-gray-800">Node Details</h3>
              <button 
                onClick={closeDetails}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            <div className="p-3 max-h-80 overflow-y-auto">
              <div className="space-y-2.5">
                <div className="flex">
                  <span className="font-medium text-gray-700 text-sm w-20">ID:</span>
                  <span className="text-gray-600 font-mono text-sm">{selectedNode.id}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 text-sm w-20">Name:</span>
                  <span className="text-gray-600 text-sm">{selectedNode.name}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 text-sm w-20">Date:</span>
                  <span className="text-gray-600 text-sm">{selectedNode.date}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 text-sm w-20">Type:</span>
                  <span className="text-gray-600 text-sm">{selectedNode.type}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 text-sm">Description:</span>
                  <p className="mt-1 text-gray-600 text-xs leading-relaxed">{selectedNode.description}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700 text-sm">Dependencies:</span>
                  <ul className="mt-1 space-y-1">
                    {selectedNode.dependencies.map((dep, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-center">
                        <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                        {dep}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkflowDiagram;