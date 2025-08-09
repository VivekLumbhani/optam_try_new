import { Card } from "@/components/ui/card";
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
}

const processSteps: ProcessStep[] = [
  {
    id: 'design',
    title: 'Design',
    icon: <FileCode2 className="h-8 w-8" />,
    color: 'text-white',
    bgColor: 'bg-am-red',
    description: 'CAD Model Creation',
    status: 'completed'
  },
  {
    id: 'simulation',
    title: 'Simulation',
    icon: <Play className="h-8 w-8" />,
    color: 'text-white',
    bgColor: 'bg-am-dark',
    description: 'Process Optimization',
    status: 'completed'
  },
  {
    id: 'printing',
    title: 'Printing',
    icon: <Printer className="h-8 w-8" />,
    color: 'text-white',
    bgColor: 'bg-am-red',
    description: 'Additive Manufacturing',
    status: 'active'
  },
  {
    id: 'post-processing',
    title: 'Post-Processing',
    icon: <Wrench className="h-8 w-8" />,
    color: 'text-white',
    bgColor: 'bg-am-dark',
    description: 'Finishing Operations',
    status: 'pending'
  },
  {
    id: 'inspection',
    title: 'Inspection',
    icon: <CheckCircle className="h-8 w-8" />,
    color: 'text-white',
    bgColor: 'bg-am-dark',
    description: 'Quality Control',
    status: 'pending'
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
  return (
    <div className="w-full bg-white rounded-lg border p-8">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button className="text-am-red text-2xl font-bold">+</button>
          <button className="text-am-dark text-xl">↑</button>
          <button className="text-am-dark text-xl">↓</button>
        </div>
      </div>

      {/* Process Flow */}
      <div className="relative">
        {/* Main Timeline */}
        <div className="flex items-center justify-between mb-12">
          {processSteps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative">
              {/* Step Button */}
              <div className={`${step.bgColor} ${step.color} px-6 py-3 rounded-lg font-semibold text-sm mb-4 relative z-10`}>
                {step.title}
              </div>
              
              {/* Connection Line */}
              {index < processSteps.length - 1 && (
                <div className="absolute top-6 left-full w-full h-0.5 bg-am-red transform translate-x-0 z-0" 
                     style={{ width: '100%' }} />
              )}
            </div>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-am-red transform -translate-y-1/2" />
          {processSteps.map((step, index) => (
            <div key={`dot-${step.id}`} className="relative z-10">
              <div className={`w-4 h-4 rounded-full ${
                step.status === 'completed' ? 'bg-am-red' : 
                step.status === 'active' ? 'bg-am-red animate-pulse' : 
                'bg-am-gray'
              }`} />
            </div>
          ))}
        </div>

        {/* Process Details Cards */}
        <div className="grid grid-cols-5 gap-6">
          {processSteps.map((step, index) => (
            <Card key={`card-${step.id}`} className="p-6 text-center border-2 border-am-red">
              <div className="text-am-red mb-4 flex justify-center">
                {processIcons[index]}
              </div>
              <h3 className="font-semibold text-am-dark mb-2">{step.title}</h3>
              <p className="text-sm text-am-gray-dark">{step.description}</p>
            </Card>
          ))}
        </div>

        {/* Bottom Timeline */}
        <div className="flex items-center justify-between mt-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-am-red transform -translate-y-1/2" />
          {processSteps.map((step, index) => (
            <div key={`bottom-dot-${step.id}`} className="relative z-10">
              <div className="w-4 h-4 rounded-full bg-am-red" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DigitalThreadChart;