import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
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
  ClipboardCheck,
  Zap,
  Activity,
  Database,
  ArrowRight,
  Signal
} from "lucide-react";

const processSteps = [
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

const DigitalThreadChart = () => {
  const [selectedStep, setSelectedStep] = useState(processSteps[2]);
  const [dataFlow, setDataFlow] = useState(0);
  const [realTimeData, setRealTimeData] = useState({
    currentLayer: 1247,
    progress: 59.4,
    temperature: 82.3,
    speed: 1180
  });
  const [pulseActive, setPulseActive] = useState(true);

  // Simulate real-time data updates for active printing
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedStep.status === 'active') {
        setRealTimeData(prev => ({
          currentLayer: prev.currentLayer + Math.floor(Math.random() * 3),
          progress: Math.min(prev.progress + (Math.random() * 0.5), 100),
          temperature: 82.3 + (Math.random() - 0.5) * 2,
          speed: 1180 + (Math.random() - 0.5) * 50
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedStep.status]);

  // Data flow animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDataFlow(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Pulse animation control
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseActive(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleStepClick = (step) => {
    setSelectedStep(step);
  };

  const getConnectionAnimation = (index) => {
    const delay = index * 200;
    return {
      animation: `dataFlow 3s linear infinite`,
      animationDelay: `${delay}ms`
    };
  };

  return (
    <div className="w-full space-y-8">
      <style jsx>{`
        @keyframes dataFlow {
          0% { 
            background-position: 0% 50%;
            opacity: 0.3;
          }
          50% { 
            opacity: 1;
          }
          100% { 
            background-position: 100% 50%;
            opacity: 0.3;
          }
        }
        
        @keyframes pulse {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
            transform: scale(1.05);
          }
        }
        
        @keyframes glow {
          0%, 100% { 
            filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.5));
          }
          50% { 
            filter: drop-shadow(0 0 20px rgba(239, 68, 68, 0.8));
          }
        }

        .data-flow {
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(239, 68, 68, 0.3) 25%, 
            rgba(239, 68, 68, 0.8) 50%, 
            rgba(239, 68, 68, 0.3) 75%, 
            transparent 100%
          );
          background-size: 200% 100%;
        }

        .connection-line {
          background: linear-gradient(90deg,
            #ef4444 0%,
            #dc2626 25%,
            #ef4444 50%,
            #dc2626 75%,
            #ef4444 100%
          );
          background-size: 200% 100%;
          animation: dataFlow 2s ease-in-out infinite;
        }

        .active-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .pulse-ring {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-wider mb-4">
            <span className="text-am-dark">DIGITAL</span>{" "}
            <span className="text-am-red bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent px-3 py-1">THREAD</span>
          </h1>
          
          {/* Live Status Indicator */}
          <div className="flex items-center justify-center space-x-2 text-sm">
            <div className="flex items-center space-x-1">
              <Signal className="h-4 w-4 text-green-500" />
              <span className="text-gray-600">Live Data Stream</span>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="relative mb-12">
          {/* Enhanced Process Steps with Interconnections */}
          <div className="flex items-center justify-between mb-8 relative">
            {processSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative group">
                {/* Data Transfer Indicators */}
                {step.status === 'active' && (
                  <div className="absolute -top-2 -right-2 z-20">
                    <Activity className="h-4 w-4 text-red-500 animate-pulse" />
                  </div>
                )}
                
                {/* Clickable Step Button with Enhanced Effects */}
                <button
                  onClick={() => handleStepClick(step)}
                  className={`${step.bgColor} ${step.color} px-6 py-4 rounded-xl font-semibold text-sm mb-6 relative z-10 transition-all duration-300 hover:scale-110 hover:shadow-2xl transform ${
                    selectedStep.id === step.id ? 'ring-4 ring-am-red ring-offset-4 scale-105' : ''
                  } ${step.status === 'active' ? 'active-glow pulse-ring' : ''} group-hover:shadow-lg`}
                >
                  <div className="flex items-center space-x-2">
                    {step.icon}
                    <span>{step.title}</span>
                  </div>
                  
                  {/* Real-time Progress Bar for Active Step */}
                  {step.status === 'active' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 rounded-b-xl overflow-hidden">
                      <div 
                        className="h-full bg-white transition-all duration-1000"
                        style={{ width: `${realTimeData.progress}%` }}
                      />
                    </div>
                  )}
                </button>
                
                {/* Enhanced Connection Lines with Data Flow Animation */}
                {index < processSteps.length - 1 && (
                  <div className="absolute top-8 left-full w-full flex items-center z-0" 
                       style={{ width: 'calc(100% - 4rem)' }}>
                    {/* Main connection line */}
                    <div className="h-1 flex-1 connection-line rounded-full" />
                    
                    {/* Data packet indicators */}
                    <div className="absolute inset-0 flex items-center">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 bg-red-500 rounded-full shadow-lg"
                          style={{
                            animation: `dataFlow 3s linear infinite`,
                            animationDelay: `${i * 1000}ms`,
                            position: 'absolute',
                            left: `${(dataFlow + i * 33) % 100}%`
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Arrow indicator */}
                    <ArrowRight className="h-4 w-4 text-red-500 ml-2 animate-pulse" />
                  </div>
                )}

                {/* Data Node Indicator */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <Database className={`h-6 w-6 ${
                    step.status === 'completed' ? 'text-green-500' : 
                    step.status === 'active' ? 'text-red-500 animate-pulse' : 
                    'text-gray-400'
                  }`} />
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Progress Timeline */}
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-red-600 to-gray-300 rounded-full transform -translate-y-1/2 overflow-hidden">
              {/* Animated progress indicator */}
              <div className="h-full data-flow" />
            </div>
            
            {processSteps.map((step, index) => (
              <div key={`dot-${step.id}`} className="relative z-10">
                <div className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-300 border-2 border-white shadow-lg ${
                  step.status === 'completed' ? 'bg-green-500 hover:scale-125' : 
                  step.status === 'active' ? 'bg-red-500 animate-pulse pulse-ring hover:scale-125' : 
                  'bg-gray-400 hover:scale-110'
                } ${selectedStep.id === step.id ? 'scale-150 ring-2 ring-white ring-offset-2' : ''}`} 
                     onClick={() => handleStepClick(step)}>
                  
                  {/* Activity indicator for active step */}
                  {step.status === 'active' && (
                    <div className="absolute inset-0 rounded-full">
                      <Zap className="h-3 w-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Data Display Section */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border shadow-xl p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-am-dark">
              {selectedStep.title} - {selectedStep.description}
            </h2>
            
            {/* Real-time Status Badge */}
            <div className="flex items-center space-x-3">
              {selectedStep.status === 'active' && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-red-50 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-red-700 text-sm font-medium">Live</span>
                </div>
              )}
              
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedStep.status === 'completed' ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800' :
                selectedStep.status === 'active' ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 shadow-md' :
                'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700'
              }`}>
                {selectedStep.status.charAt(0).toUpperCase() + selectedStep.status.slice(1)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Parameters Section */}
          <div className="bg-white rounded-xl p-6 shadow-md border">
            <div className="flex items-center space-x-2 mb-6">
              <BarChart3 className="h-6 w-6 text-blue-500" />
              <h3 className="text-xl font-semibold text-am-dark">Process Parameters</h3>
            </div>
            <div className="space-y-4">
              {selectedStep.data.parameters.map((param, index) => (
                <div key={index} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{param.name}:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-am-dark text-lg">
                        {param.name === 'Current Layer' && selectedStep.status === 'active' ? 
                          realTimeData.currentLayer : 
                         param.name === 'Build Progress' && selectedStep.status === 'active' ? 
                          realTimeData.progress.toFixed(1) :
                         param.name === 'Chamber Temp' && selectedStep.status === 'active' ? 
                          realTimeData.temperature.toFixed(1) :
                         param.name === 'Print Speed' && selectedStep.status === 'active' ? 
                          realTimeData.speed :
                          param.value
                        }
                      </span>
                      {param.unit && <span className="text-gray-500 text-sm">{param.unit}</span>}
                      {selectedStep.status === 'active' && index < 2 && (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Metrics Section */}
          <div className="bg-white rounded-xl p-6 shadow-md border">
            <div className="flex items-center space-x-2 mb-6">
              <Activity className="h-6 w-6 text-green-500" />
              <h3 className="text-xl font-semibold text-am-dark">Status & Metrics</h3>
            </div>
            <div className="space-y-4">
              {selectedStep.data.metrics.map((metric, index) => (
                <div key={index} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{metric.name}:</span>
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-am-dark">{metric.value}</span>
                      <div className={`w-4 h-4 rounded-full relative ${
                        metric.status === 'good' ? 'bg-green-500' :
                        metric.status === 'warning' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}>
                        {metric.status === 'good' && selectedStep.status === 'active' && (
                          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Files Section */}
          <div className="bg-white rounded-xl p-6 shadow-md border">
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-6 w-6 text-purple-500" />
              <h3 className="text-xl font-semibold text-am-dark">Associated Files</h3>
            </div>
            <div className="space-y-3">
              {selectedStep.data.files.map((file, index) => (
                <div key={index} className="p-4 border-2 border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold text-am-dark text-sm group-hover:text-red-700">{file.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">{file.type}</span>
                        <span className="text-xs text-gray-500">{file.size}</span>
                      </div>
                    </div>
                    {selectedStep.status === 'active' && index === 0 && (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Interconnection Visualization */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Database className="h-5 w-5 mr-2 text-blue-500" />
            Real-time Data Interconnections
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['CAD → Simulation', 'Simulation → Print', 'Print → Monitor', 'Monitor → QC'].map((connection, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-white rounded-lg shadow-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700">{connection}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalThreadChart;