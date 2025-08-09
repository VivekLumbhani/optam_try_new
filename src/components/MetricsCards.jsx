import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const metrics = [
  {
    title: "Process Efficiency",
    value: "87%",
    change: "+5.2%",
    trend: "up",
    icon: TrendingUp,
    progress: 87
  },
  {
    title: "Avg. Build Time",
    value: "14.2h",
    change: "-2.1h",
    trend: "down",
    icon: Clock,
    progress: 75
  },
  {
    title: "Quality Rate",
    value: "96.3%",
    change: "+1.8%",
    trend: "up",
    icon: CheckCircle,
    progress: 96
  },
  {
    title: "Active Builds",
    value: "23",
    change: "+7",
    trend: "up",
    icon: AlertTriangle,
    progress: 65
  }
];

const MetricsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        const isPositive = metric.trend === "up";
        
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-am-gray-dark">
                {metric.title}
              </CardTitle>
              <IconComponent className="h-4 w-4 text-am-gray-dark" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-end space-x-2">
                  <div className="text-2xl font-bold text-am-dark">{metric.value}</div>
                  <div className={`text-xs font-medium ${
                    isPositive ? 'text-green-600' : 'text-am-red'
                  }`}>
                    {metric.change}
                  </div>
                </div>
                <Progress 
                  value={metric.progress} 
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MetricsCards;