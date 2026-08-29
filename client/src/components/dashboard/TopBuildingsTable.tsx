import { Link } from "wouter";

type Building = {
  id: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  landlord: string;
};

type TopBuildingData = {
  building: Building;
  issueCount: number;
  status: string;
  trend: number;
};

type TopBuildingsTableProps = {
  data: TopBuildingData[] | undefined;
};

const TopBuildingsTable = ({ data }: TopBuildingsTableProps) => {
  // Helper to get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'critical':
        return 'bg-status-error bg-opacity-10 text-status-error';
      case 'high':
        return 'bg-status-warning bg-opacity-10 text-status-warning';
      case 'medium':
        return 'bg-status-info bg-opacity-10 text-status-info';
      case 'low':
        return 'bg-accent bg-opacity-10 text-accent';
      default:
        return 'bg-neutral-200 text-neutral-600';
    }
  };

  // Helper to get trend text and color
  const getTrendDisplay = (trend: number) => {
    if (trend > 0) {
      return { text: `↑ ${trend}%`, color: 'text-status-error' };
    } else if (trend < 0) {
      return { text: `↓ ${Math.abs(trend)}%`, color: 'text-accent' };
    } else {
      return { text: '- Stable', color: 'text-neutral-500' };
    }
  };

  // Handle CSV download
  const handleDownloadCSV = () => {
    if (!data) return;
    
    // Create CSV content
    const csvContent = [
      "Building,Address,Issues,Status,Trend",
      ...data.map(item => {
        const building = item.building;
        const address = `${building.address}, ${building.city}, ${building.state} ${building.zipCode}`;
        return `"${address}",${item.issueCount},"${item.status}","${item.trend > 0 ? '+' : ''}${item.trend}%"`;
      }),
    ].join("\n");
    
    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "top-buildings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg" style={{ minHeight: "540px" }}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Top Buildings by Issues</h3>
        <div>
          <button 
            className="text-neutral-500 hover:text-neutral-700 p-1" 
            title="Download as CSV"
            onClick={handleDownloadCSV}
          >
            <span className="material-icons text-sm">file_download</span>
          </button>
        </div>
      </div>
      
      {!data ? (
        <div className="h-48 flex items-center justify-center">
          <span className="material-icons animate-spin mr-2">autorenew</span>
          <span>Loading data...</span>
        </div>
      ) : data.length === 0 ? (
        <div className="h-48 flex items-center justify-center">
          <span className="text-neutral-500">No data available</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead>
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Building</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Issues</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {data.map((item, index) => {
                const { text: trendText, color: trendColor } = getTrendDisplay(item.trend);
                
                return (
                  <tr key={index}>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <Link href={`/buildings/${item.building.id}`} className="text-sm font-medium text-primary hover:text-primary-dark">
                        {item.building.address}
                      </Link>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm">{item.issueCount}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className={`px-3 py-4 whitespace-nowrap text-sm ${trendColor}`}>{trendText}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-4 text-right">
            <Link href="/buildings" className="text-primary text-sm font-medium flex items-center justify-end">
                View all buildings
                <span className="material-icons text-sm ml-1">arrow_forward</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBuildingsTable;
