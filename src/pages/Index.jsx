import Header from "@/components/Header";
import DigitalThreadChart from "@/components/DigitalThreadChart";
import ProcessPhases from "@/components/ProcessPhases";
import WorkflowDiagram from "@/components/WorkflowDiagram";
import MetricsCards from "@/components/MetricsCards";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Metrics Overview */}
        <section>
          <h2 className="text-2xl font-bold text-am-dark mb-6">Production Overview</h2>
          <MetricsCards />
        </section>

        {/* Digital Thread Visualization */}
        <section>
          <h2 className="text-2xl font-bold text-am-dark mb-6">Digital Thread Process Flow</h2>
          <DigitalThreadChart />
        </section>

        {/* Process Phases */}
        <section>
          <h2 className="text-2xl font-bold text-am-dark mb-6">Manufacturing Phases</h2>
          <ProcessPhases />
        </section>

        {/* Workflow Diagram */}
        <section>
          <h2 className="text-2xl font-bold text-am-dark mb-6">Workflow Analysis</h2>
          <WorkflowDiagram />
        </section>
      </main>
    </div>
  );
};

export default Index;