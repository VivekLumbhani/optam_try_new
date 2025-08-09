import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PhaseData {
  phase: string;
  title: string;
  status: 'completed' | 'active' | 'pending';
  description: string;
  details: string[];
}

const phases: PhaseData[] = [
  {
    phase: "Phase 1",
    title: "AM Design",
    status: 'completed',
    description: "Initial design phase for additive manufacturing",
    details: [
      "Geometry Information",
      "Digital model",
      "Physical object",
      "Material Information",
      "Machine Information",
      "Design requirement"
    ]
  },
  {
    phase: "Phase 2",
    title: "AM Design with Build Plan",
    status: 'completed',
    description: "Design optimization with manufacturing considerations",
    details: [
      "Tessellated Data",
      "Vertex information",
      "Color information",
      "Material information",
      "Process parameters"
    ]
  },
  {
    phase: "Phase 3",
    title: "AM Design with Machine-Specific Build Plan",
    status: 'active',
    description: "Machine-specific optimization and slicing",
    details: [
      "Sliced 2.5 D for general AM",
      "Optimally sliced data for specific machine",
      "Support structure",
      "Lattice structure",
      "Orientation"
    ]
  },
  {
    phase: "Phase 4",
    title: "Build",
    status: 'pending',
    description: "Physical manufacturing process execution",
    details: [
      "Information for AM process",
      "Material information",
      "Process information",
      "Environmental conditions"
    ]
  },
  {
    phase: "Phase 5",
    title: "Post Processed Part",
    status: 'pending',
    description: "Part finishing and post-processing operations",
    details: [
      "Information for post process",
      "Process information",
      "Material environment",
      "Manufacturing data"
    ]
  },
  {
    phase: "Phase 6",
    title: "Qualified Part",
    status: 'pending',
    description: "Final inspection and quality assurance",
    details: [
      "Information for part qualification",
      "Quality assurance",
      "Requirement compliance",
      "Final specifications"
    ]
  }
];

const ProcessPhases = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-primary text-primary-foreground';
      case 'pending':
        return 'bg-am-gray text-am-gray-dark';
      default:
        return 'bg-am-gray text-am-gray-dark';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {phases.map((phase, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-am-dark">
                {phase.phase}
              </CardTitle>
              <Badge className={getStatusColor(phase.status)}>
                {phase.status}
              </Badge>
            </div>
            <h3 className="text-base font-medium text-am-red">
              {phase.title}
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-am-gray-dark mb-4">
              {phase.description}
            </p>
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-am-dark uppercase tracking-wide">
                Key Components:
              </h4>
              <ul className="space-y-1">
                {phase.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="text-xs text-am-gray-dark flex items-center">
                    <div className="w-1.5 h-1.5 bg-am-red rounded-full mr-2" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProcessPhases;