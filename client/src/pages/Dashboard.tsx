import { useQuery } from "@tanstack/react-query";
import StatCard from "@/components/dashboard/StatCard";
import IssuesByCategoryChart from "@/components/dashboard/IssuesByCategoryChart";
import TopBuildingsTable from "@/components/dashboard/TopBuildingsTable";

type DashboardStats = {
  totalIssues: number;
  buildingsAffected: number;
  unresolvedIssues: number;
  resolvedIssues: number;
};

const Dashboard = () => {
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery<DashboardStats>({
    queryKey: ['/api/stats'],
  });

  const { data: categoryData, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['/api/stats/categories'],
  });

  const { data: topBuildings, isLoading: buildingsLoading, error: buildingsError } = useQuery({
    queryKey: ['/api/stats/top-buildings'],
  });

  const isLoading = statsLoading || categoriesLoading || buildingsLoading;
  const hasError = statsError || categoriesError || buildingsError;

  if (isLoading) {
    return (
      <div className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">Loading dashboard data...</div>
          </div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2 text-status-error">Error loading dashboard</div>
            <p className="text-neutral-600">Unable to fetch dashboard data. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-2">Landlord Issue Dashboard</h2>
          <p className="text-neutral-600">Current overview of reported issues across all properties</p>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            title="Total Reports" 
            value={stats?.totalIssues || 0} 
            icon="assignment" 
            color="primary" 
            change={12} 
          />
          <StatCard 
            title="Buildings Affected" 
            value={stats?.buildingsAffected || 0} 
            icon="apartment" 
            color="secondary" 
            change={5} 
          />
          <StatCard 
            title="Unresolved Issues" 
            value={stats?.unresolvedIssues || 0} 
            icon="warning" 
            color="status-error" 
            change={8} 
          />
          <StatCard 
            title="Resolved Issues" 
            value={stats?.resolvedIssues || 0} 
            icon="check_circle" 
            color="accent" 
            change={15} 
          />
        </div>
        
        {/* Data Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <IssuesByCategoryChart data={categoryData} />
          <TopBuildingsTable data={topBuildings} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
