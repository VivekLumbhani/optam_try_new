import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowRight } from "lucide-react";

interface WorkflowStep {
  id: string;
  title: string;
  type: 'process' | 'data' | 'decision';
  connections: string[];
  position: { x: number; y: number };
}

const workflowSteps: WorkflowStep[] = [
  { id: 'design-req', title: 'Design Requirements', type: 'data', connections: ['cad-model'], position: { x: 0, y: 0 } },
  { id: 'cad-model', title: 'CAD Model', type: 'process', connections: ['process-plan'], position: { x: 1, y: 0 } },
  { id: 'process-plan', title: 'Process Planning', type: 'process', connections: ['build-model'], position: { x: 2, y: 0 } },
  { id: 'build-model', title: 'Build Model', type: 'process', connections: ['am-workpiece'], position: { x: 3, y: 0 } },
  { id: 'am-workpiece', title: 'AM Workpiece', type: 'process', connections: ['post-process'], position: { x: 4, y: 0 } },
  { id: 'post-process', title: 'Post Process Workpiece', type: 'process', connections: ['evaluate'], position: { x: 4, y: 1 } },
  { id: 'evaluate', title: 'Evaluate Part', type: 'decision', connections: [], position: { x: 3, y: 1 } }
];

const dataTypes = [
  { name: 'Critical Part Data', style: 'border-solid border-2 border-am-dark' },
  { name: 'General Data', style: 'border-dotted border-2 border-am-gray-dark' },
  { name: 'Material', style: 'border-dashed border-2 border-am-red' },
  { name: 'Resource', style: 'border-dotted border-2 border-am-red' }
];

const WorkflowDiagram = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-am-dark">
          AM Workflow - IDEFO Diagram
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Legend */}
        <div className="mb-6 p-4 bg-am-gray/30 rounded-lg">
          <h3 className="font-semibold text-am-dark mb-3">Key</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dataTypes.map((type, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-6 h-1 ${type.style} bg-white`} />
                <span className="text-xs text-am-gray-dark">{type.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Grid */}
        <div className="relative grid grid-cols-5 grid-rows-3 gap-4 min-h-96">
          {/* Design Requirements */}
          <div className="col-start-1 row-start-1">
            <div className="bg-am-gray border-2 border-am-dark p-3 rounded text-center text-sm">
              <div className="font-semibold text-am-dark">Design Requirements</div>
              <div className="text-xs text-am-gray-dark mt-1">Standards, Production Controls</div>
            </div>
          </div>

          {/* CAD Model */}
          <div className="col-start-2 row-start-1">
            <div className="bg-white border-2 border-am-dark p-3 rounded text-center text-sm">
              <div className="font-semibold text-am-dark">CAD Model</div>
              <div className="text-xs text-am-gray-dark mt-1">A1</div>
            </div>
          </div>

          {/* Process Planning */}
          <div className="col-start-3 row-start-1">
            <div className="bg-white border-2 border-am-dark p-3 rounded text-center text-sm">
              <div className="font-semibold text-am-dark">Plan Process (Machine Independent)</div>
              <div className="text-xs text-am-gray-dark mt-1">A2</div>
            </div>
          </div>

          {/* Build Model */}
          <div className="col-start-4 row-start-1">
            <div className="bg-white border-2 border-am-dark p-3 rounded text-center text-sm">
              <div className="font-semibold text-am-dark">Plan Process (Machine Dependent)</div>
              <div className="text-xs text-am-gray-dark mt-1">A3</div>
            </div>
          </div>

          {/* AM Workpiece */}
          <div className="col-start-4 row-start-2">
            <div className="bg-am-dark text-white p-3 rounded text-center text-sm">
              <div className="font-semibold">AM Build</div>
              <div className="text-xs mt-1">A4</div>
            </div>
          </div>

          {/* Post Process */}
          <div className="col-start-4 row-start-3">
            <div className="bg-white border-2 border-am-dark p-3 rounded text-center text-sm">
              <div className="font-semibold text-am-dark">Post-Process Workpiece</div>
              <div className="text-xs text-am-gray-dark mt-1">A5</div>
            </div>
          </div>

          {/* Evaluate Part */}
          <div className="col-start-3 row-start-3">
            <div className="bg-white border-2 border-am-dark p-3 rounded text-center text-sm">
              <div className="font-semibold text-am-dark">Evaluate Part</div>
              <div className="text-xs text-am-gray-dark mt-1">A6</div>
            </div>
          </div>

          {/* Connection arrows would be positioned absolutely here */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Horizontal arrows */}
            <ArrowRight className="absolute top-12 left-28 text-am-red h-4 w-4" />
            <ArrowRight className="absolute top-12 left-56 text-am-red h-4 w-4" />
            <ArrowRight className="absolute top-12 left-84 text-am-red h-4 w-4" />
            
            {/* Vertical arrows */}
            <ArrowDown className="absolute top-20 left-80 text-am-red h-4 w-4" />
            <ArrowDown className="absolute top-48 left-80 text-am-red h-4 w-4" />
          </div>
        </div>

        {/* Additional Information Boxes */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-am-gray/20 p-4 rounded-lg">
            <h4 className="font-semibold text-am-dark mb-2">Data Generation</h4>
            <ul className="text-xs text-am-gray-dark space-y-1">
              <li>• 3D scanning sensor</li>
              <li>• Tessellation</li>
              <li>• Registration</li>
              <li>• Mesh generation</li>
            </ul>
          </div>
          
          <div className="bg-am-gray/20 p-4 rounded-lg">
            <h4 className="font-semibold text-am-dark mb-2">AM Machine/Material</h4>
            <ul className="text-xs text-am-gray-dark space-y-1">
              <li>• LPBF/Ti64</li>
              <li>• DED/IN625</li>
              <li>• Machine specifications</li>
            </ul>
          </div>
          
          <div className="bg-am-gray/20 p-4 rounded-lg">
            <h4 className="font-semibold text-am-dark mb-2">Test Methods</h4>
            <ul className="text-xs text-am-gray-dark space-y-1">
              <li>• Round robin test</li>
              <li>• NDE methods</li>
              <li>• Quality assessment</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowDiagram;