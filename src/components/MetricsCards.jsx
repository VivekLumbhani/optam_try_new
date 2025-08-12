"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MeshStandardMaterial } from "three";

const metrics = [
  {
    title: "Process Efficiency",
    value: "87%",
    change: "+5.2%",
    trend: "up",
    icon: TrendingUp,
    progress: 87,
  },
  {
    title: "Avg. Build Time",
    value: "14.2h",
    change: "-2.1h",
    trend: "down",
    icon: Clock,
    progress: 75,
  },
  {
    title: "Quality Rate",
    value: "96.3%",
    change: "+1.8%",
    trend: "up",
    icon: CheckCircle,
    progress: 96,
  },
  {
    title: "Active Builds",
    value: "23",
    change: "+7",
    trend: "up",
    icon: AlertTriangle,
    progress: 65,
  },
];

export default function MetricsDashboard() {
  const [shape, setShape] = useState("Box");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Side: Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          const isPositive = metric.trend === "up";

          return (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-am-gray-dark">
                  {metric.title}
                </CardTitle>
                <IconComponent className="h-4 w-4 text-am-gray-dark" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-end space-x-2">
                    <div className="text-2xl font-bold text-am-dark">
                      {metric.value}
                    </div>
                    <div
                      className={`text-xs font-medium ${
                        isPositive ? "text-green-600" : "text-am-red"
                      }`}
                    >
                      {metric.change}
                    </div>
                  </div>
                  <Progress value={metric.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Right Side: 3D Shape Viewer */}
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Material View</h2>
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={shape}
            onChange={(e) => setShape(e.target.value)}
          >
            <option value="Box">Square</option>
            <option value="Sphere">Circle</option>
            <option value="Rectangle">Rectangle</option>
            <option value="Cone">Pyramid</option>
          </select>
        </div>

        <div className="h-[250px] w-full">
          <Canvas camera={{ position: [3, 3, 3] }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} />
            <OrbitControls enableZoom={true} />

            {shape === "Box" && (
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#FF3147" />
              </mesh>
            )}

            {shape === "Sphere" && (
              <mesh>
                <sphereGeometry args={[0.75, 32, 32]} />
                <meshStandardMaterial color="#FF3147" />
              </mesh>
            )}

            {shape === "Rectangle" && (
              <mesh>
                <boxGeometry args={[1.5, 1, 0.5]} />
                <meshStandardMaterial color="#FF3147" />
              </mesh>
            )}

            {shape === "Cone" && (
              <mesh>
                <coneGeometry args={[1, 1.5, 4]} />
                <meshStandardMaterial color="#FF3147" />
              </mesh>
            )}
          </Canvas>
        </div>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Material Name:</strong> Titanium Alloy
          </p>
          <p>
            <strong>Material ID:</strong> MAT-4872
          </p>
          <p>
            <strong>Porosity:</strong> 3.7%
          </p>
        </div>
      </div>
    </div>
  );
}
