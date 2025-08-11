import React, { useCallback } from "react";
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

const initialNodes = [
  { id: "A0", position: { x: 0, y: 0 }, data: { label: <>Design Requirements<br/><small>Standards, Production Controls</small></> }, style: { border: "2px solid #000", padding: 10, borderRadius: 5, background: "#fff" }},
  { id: "A1", position: { x: 250, y: 0 }, data: { label: "CAD Model" }, style: { border: "2px solid #000", padding: 10, borderRadius: 5, background: "#fff" }},
  { id: "A2", position: { x: 500, y: 0 }, data: { label: "Plan Process (Machine Independent)" }, style: { border: "2px solid #000", padding: 10, borderRadius: 5, background: "#fff" }},
  { id: "A3", position: { x: 750, y: 0 }, data: { label: "Plan Process (Machine Dependent)" }, style: { border: "2px solid #000", padding: 10, borderRadius: 5, background: "#fff" }},
  { id: "A4", position: { x: 750, y: 150 }, data: { label: "AM Build" }, style: { borderRadius: 5, padding: 10, background: "#000", color: "#fff" }},
  { id: "A5", position: { x: 750, y: 300 }, data: { label: "Post-Process Workpiece" }, style: { border: "2px solid #000", padding: 10, borderRadius: 5, background: "#fff" }},
  { id: "A6", position: { x: 500, y: 300 }, data: { label: "Evaluate Part" }, style: { border: "2px solid #000", padding: 10, borderRadius: 5, background: "#fff" }},
];

const initialEdges = [
  { id: "e0-1", source: "A0", target: "A1", animated: true, style: { stroke: "#c00" }},
  { id: "e1-2", source: "A1", target: "A2", animated: true, style: { stroke: "#c00" }},
  { id: "e2-3", source: "A2", target: "A3", animated: true, style: { stroke: "#c00" }},
  { id: "e3-4", source: "A3", target: "A4", animated: true, style: { stroke: "#c00" }},
  { id: "e4-5", source: "A4", target: "A5", animated: true, style: { stroke: "#c00" }},
  { id: "e5-6", source: "A5", target: "A6", animated: true, style: { stroke: "#c00" }},
];

const WorkflowDiagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: "#c00" } }, eds)),
    []
  );

  return (
    <Card className="w-full h-[600px]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-am-dark">
          AM Workflow - IDEFO Diagram
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background gap={16} color="#ddd" />
        </ReactFlow>
      </CardContent>
    </Card>
  );
};

export default WorkflowDiagram;
