import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

type Building = {
  id: number;
  address: string;
  unit: string | null;
  city: string;
  state: string;
  zipCode: string;
  landlord: string;
};

type BuildingCardProps = {
  building: Building;
};

const BuildingCard = ({ building }: BuildingCardProps) => {
  // Fetch issues for this building
  const { data: issues, isLoading } = useQuery({
    queryKey: [`/api/buildings/${building.id}/issues`],
  });

  // Calculate issue stats
  const issueCount = issues?.length || 0;
  const openIssues = issues?.filter((issue: any) => issue.status === 'open').length || 0;
  
  // Determine severity based on issue count
  let severity = "Low";
  let severityColor = "bg-accent bg-opacity-10 text-accent";
  
  if (issueCount > 30) {
    severity = "Critical";
    severityColor = "bg-status-error bg-opacity-10 text-status-error";
  } else if (issueCount > 20) {
    severity = "High";
    severityColor = "bg-status-warning bg-opacity-10 text-status-warning";
  } else if (issueCount > 10) {
    severity = "Medium";
    severityColor = "bg-status-info bg-opacity-10 text-status-info";
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg">{building.address}</h3>
          {!isLoading && (
            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${severityColor}`}>
              {severity}
            </span>
          )}
        </div>
        
        <div className="mb-4">
          <p className="text-neutral-600 text-sm">
            {building.city}, {building.state} {building.zipCode}
          </p>
          <p className="text-neutral-500 text-sm">
            <span className="font-medium">Landlord:</span> {building.landlord}
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <span className="material-icons animate-spin mr-2 text-sm">autorenew</span>
            <span className="text-sm">Loading issues...</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-neutral-100 p-3 rounded-md text-center">
              <span className="block text-xl font-bold text-primary-dark">{issueCount}</span>
              <span className="text-xs text-neutral-500">Total Issues</span>
            </div>
            <div className="bg-neutral-100 p-3 rounded-md text-center">
              <span className="block text-xl font-bold text-status-error">{openIssues}</span>
              <span className="text-xs text-neutral-500">Open Issues</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-200 flex justify-between">
        <Link href={`/buildings/${building.id}`}>
          <a className="text-primary font-medium text-sm flex items-center">
            View Details
            <span className="material-icons text-sm ml-1">info</span>
          </a>
        </Link>
        
        <Link href={`/report?building=${building.id}`}>
          <a className="text-secondary font-medium text-sm flex items-center">
            Report Issue
            <span className="material-icons text-sm ml-1">add_circle</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BuildingCard;
