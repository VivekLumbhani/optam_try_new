import { Card } from "@/components/ui/card";
import { useState } from "react";
import { 
  FileCode2, 
  Play, 
  Printer, 
  Wrench, 
  CheckCircle,
  BarChart3,
  FileText,
  Layers,
  TrendingUp,
  ClipboardCheck
} from "lucide-react";

interface ProcessStep {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
  data: {
    parameters: { name: string; value: string; unit?: string }[];
    metrics: { name: string; value: string; status: 'good' | 'warning' | 'critical' }[];
    files: { name: string; type: string; size: string }[];
  };
}

const processSteps: ProcessStep[] = [
  {
    id: 'design',
    title: 'Design',
    icon: <FileCode2 className="h-8 w-8" />,
    color: 'text-white',
    bgColor: 'bg-am-red',
    description: 'CAD Model Creation',
    status: 'completed',
    data: {
      parameters: [
        { name: 'Material', value: 'Inconel 718' },
        { name: 'Layer Height', value: '0.03', unit: 'mm' },
        { name: 'Wall Thickness', value: '2.5', unit: 'mm' },
        { name: 'Infill Density', value: '85', unit: '%' }
      ],
      metrics: [
        { name: 'Design Validation', value: 'Passed', status: 'good' },
        { name: 'Stress Analysis', value: 'Completed', status: 'good' },
        { name: 'Thermal Analysis', value: 'Completed', status: 'good' }
      ],
      files: [
        { name: 'part_design.step', type: 'CAD', size: '2.4 MB' },
        { name: 'stress_report.pdf', type: 'Analysis', size: '1.2 MB' },
        { name: 'specifications.json', type: 'Config', size: '45 KB' }
      ]
    }
  },
  {
    id: 'simulation',
    title: 'Simulation',
    icon: <Play className="h-8 w-8" />,
    color: 'text-white',
    bgColor: 'bg-am-dark',
    description: 'Process Optimization',
    status: 'completed',
    data: {
      parameters: [
        { name: 'Laser Power', value: '195', unit: 'W' },
        { name: 'Scan Speed', value: '1200', unit: 'mm/s' },
        { name: 'Hatch Distance', value: '0.12', unit: 'mm' },
        { name: 'Build Temperature', value: '80', unit: '°C' }
      ],
      metrics: [
        { name: 'Thermal Simulation', value: 'Optimized', status: 'good' },
        { name: 'Residual Stress', value: 'Within Limits', status: 'good' },
        { name: 'Support Generation', value: 'Minimal', status: 'good' }
      ],
      files: [
        { name: 'thermal_sim.ansys', type: 'Simulation', size: '45.2 MB' },
        { name: 'process_params.json', type: 'Parameters', size: '12 KB' },
        { name: 'support_structure.stl', type: 'Support', size: '8.7 MB' }
      ]
    }
  },
  {
    id: 'printing',
    title: 'Printing',
    icon: <Printer className="h-8 w-8" />,
    color: 'text-white',
    bgColor: 'bg-am-red',
    description: 'Additive Manufacturing',
    status: 'active',
    data: {
      parameters: [
        { name: 'Current Layer', value: '1247', unit: 'of 2100' },
        { name: 'Build Progress', value: '59.4', unit: '%' },
        { name: 'Print Speed', value: '1180', unit: 'mm/s' },
        { name: 'Chamber Temp', value: '82.3', unit: '°C' }
      ],
      metrics: [
        { name: 'Layer Adhesion', value: 'Good', status: 'good' },
        { name: 'Powder Quality', value: 'Optimal', status: 'good' },
        { name: 'Laser Status', value: 'Active', status: 'good' }
      ],
      files: [
        { name: 'build_log.txt', type: 'Log', size: '234 KB' },
        { name: 'layer_images.zip', type: 'Monitoring', size: '127 MB' },
        { name: 'temp_profile.csv', type: 'Data', size: '89 KB' }
      ]
    }
  },
  {
    id: 'post-processing',
    title: 'Post-Processing',
    icon: <Wrench className="h-8 w-8" />,
    color: 'text-white',
    bgColor: 'bg-am-dark',
    description: 'Finishing Operations',
    status: 'pending',
    data: {
      parameters: [
        { name: 'Heat Treatment', value: 'Solution + Aging' },
        { name: 'Solution Temp', value: '980', unit: '°C' },
        { name: 'Aging Temp', value: '720', unit: '°C' },
        { name: 'Surface Finish', value: 'Ra 3.2', unit: 'μm' }
      ],
      metrics: [
        { name: 'Support Removal', value: 'Pending', status: 'warning' },
        { name: 'Heat Treatment', value: 'Scheduled', status: 'warning' },
        { name: 'Machining', value: 'Not Started', status: 'critical' }
      ],
      files: [
        { name: 'ht_procedure.pdf', type: 'Procedure', size: '567 KB' },
        { name: 'machining_plan.nc', type: 'NC Program', size: '234 KB' },
        { name: 'surface_spec.dwg', type: 'Drawing', size: '1.8 MB' }
      ]
    }
  },
  {
    id: 'inspection',
    title: 'Inspection',
    icon: <CheckCircle className="h-8 w-8" />,
    color: 'text-white',
    bgColor: 'bg-am-dark',
    description: 'Quality Control',
    status: 'pending',
    data: {
      parameters: [
        { name: 'Dimensional Tolerance', value: '±0.1', unit: 'mm' },
        { name: 'Surface Roughness', value: 'Ra 3.2', unit: 'μm' },
        { name: 'Density Requirement', value: '>99.5', unit: '%' },
        { name: 'Hardness Target', value: '35-42', unit: 'HRC' }
      ],
      metrics: [
        { name: 'CT Scan', value: 'Scheduled', status: 'warning' },
        { name: 'CMM Inspection', value: 'Pending', status: 'warning' },
        { name: 'Material Testing', value: 'Not Started', status: 'critical' }
      ],
      files: [
        { name: 'inspection_plan.pdf', type: 'Plan', size: '445 KB' },
        { name: 'cmm_program.prg', type: 'CMM', size: '78 KB' },
        { name: 'test_certificate.pdf', type: 'Certificate', size: '0 KB' }
      ]
    }
  }
];

const processIcons = [
  <Layers className="h-12 w-12" />,
  <FileText className="h-12 w-12" />,
  <BarChart3 className="h-12 w-12" />,
  <TrendingUp className="h-12 w-12" />,
  <ClipboardCheck className="h-12 w-12" />
];

const DigitalThreadChart = () => {
  const [selectedStep, setSelectedStep] = useState<ProcessStep>(processSteps[2]); // Default to active printing step

  const handleStepClick = (step: ProcessStep) => {
    setSelectedStep(step);
  };

  return (
    <div className="w-full space-y-8">
      {/* Digital Thread Visualization */}
      <div className="bg-white rounded-lg border p-8">
        {/* Digital Thread Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-wider">
            <span className="text-am-dark">DIGITAL</span>{" "}
            <span className="text-am-red bg-am-red/10 px-3 py-1 rounded">THREAD</span>
          </h1>
        </div>

        {/* Interactive Process Flow */}
        <div className="relative">
          {/* Main Timeline with Clickable Steps */}
          <div className="flex items-center justify-between mb-8">
            {processSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative">
                {/* Clickable Step Button */}
                <button
                  onClick={() => handleStepClick(step)}
                  className={`${step.bgColor} ${step.color} px-6 py-3 rounded-lg font-semibold text-sm mb-4 relative z-10 transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                    selectedStep.id === step.id ? 'ring-2 ring-am-red ring-offset-2' : ''
                  }`}
                >
                  {step.title}
                </button>
                
                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                  <div className="absolute top-6 left-full w-full h-0.5 bg-am-red transform translate-x-0 z-0" 
                       style={{ width: '100%' }} />
                )}
              </div>
            ))}
          </div>

          {/* Progress Dots */}
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-am-red transform -translate-y-1/2" />
            {processSteps.map((step, index) => (
              <div key={`dot-${step.id}`} className="relative z-10">
                <div className={`w-4 h-4 rounded-full cursor-pointer transition-all ${
                  step.status === 'completed' ? 'bg-am-red' : 
                  step.status === 'active' ? 'bg-am-red animate-pulse' : 
                  'bg-am-gray'
                } ${selectedStep.id === step.id ? 'scale-125' : ''}`} 
                     onClick={() => handleStepClick(step)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Display Section */}
      <div className="bg-white rounded-lg border p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-am-dark mb-2">
            {selectedStep.title} - {selectedStep.description}
          </h2>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            selectedStep.status === 'completed' ? 'bg-green-100 text-green-800' :
            selectedStep.status === 'active' ? 'bg-am-red/10 text-am-red' :
            'bg-am-gray/50 text-am-gray-dark'
          }`}>
            {selectedStep.status.charAt(0).toUpperCase() + selectedStep.status.slice(1)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Parameters */}
          <div>
            <h3 className="text-lg font-semibold text-am-dark mb-4 border-b border-am-gray pb-2">
              Process Parameters
            </h3>
            <div className="space-y-3">
              {selectedStep.data.parameters.map((param, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-am-gray-dark">{param.name}:</span>
                  <span className="font-medium text-am-dark">
                    {param.value} {param.unit && <span className="text-am-gray-dark">{param.unit}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div>
            <h3 className="text-lg font-semibold text-am-dark mb-4 border-b border-am-gray pb-2">
              Status & Metrics
            </h3>
            <div className="space-y-3">
              {selectedStep.data.metrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-am-gray-dark">{metric.name}:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-am-dark">{metric.value}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      metric.status === 'good' ? 'bg-green-500' :
                      metric.status === 'warning' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Files */}
          <div>
            <h3 className="text-lg font-semibold text-am-dark mb-4 border-b border-am-gray pb-2">
              Associated Files
            </h3>
            <div className="space-y-3">
              {selectedStep.data.files.map((file, index) => (
                <div key={index} className="p-3 border border-am-gray rounded-lg hover:bg-am-gray/20 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-am-dark text-sm">{file.name}</p>
                      <p className="text-xs text-am-gray-dark">{file.type}</p>
                    </div>
                    <span className="text-xs text-am-gray-dark">{file.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalThreadChart;