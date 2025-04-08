import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ResourceCard from "@/components/resources/ResourceCard";
import DataExport from "@/components/resources/DataExport";

const resourceCategories = [
  {
    id: "legal",
    name: "Legal Resources",
    icon: "gavel",
    description: "Connect with legal aid organizations and tenant attorneys who can help with your specific case.",
    link: "/resources/legal",
  },
  {
    id: "government",
    name: "Government Agencies",
    icon: "account_balance",
    description: "Find the right city, state, or federal agencies to report violations and get assistance.",
    link: "/resources/government-agencies",
  },
  {
    id: "organizations",
    name: "Tenant Organizations",
    icon: "groups",
    description: "Connect with tenant unions and advocacy groups fighting for housing rights.",
    link: "/resources/organizations",
  }
];

const Resources = () => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'pdf'>('csv');
  const [buildingFilter, setBuildingFilter] = useState<string>('all');
  const [issueTypeFilter, setIssueTypeFilter] = useState<string>('all');
  const [dateRangeFilter, setDateRangeFilter] = useState<string>('all');
  
  const { data: buildings } = useQuery({
    queryKey: ['/api/buildings'],
  });

  // Handle export
  const handleExport = () => {
    // In a real implementation, this would call the API with the filters
    // and trigger a download of the requested format
    console.log('Export format:', exportFormat);
    console.log('Filters:', { buildingFilter, issueTypeFilter, dateRangeFilter });
    
    const apiUrl = `/api/export?format=${exportFormat}&building=${buildingFilter}&issueType=${issueTypeFilter}&dateRange=${dateRangeFilter}`;
    
    // For demo purposes, simply log the URL
    console.log('Export URL:', apiUrl);
    
    // In a real implementation, this would trigger a download
    // window.location.href = apiUrl;
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-2">Resources & Data Export</h2>
          <p className="text-neutral-600">Access helpful resources and download anonymized data for advocacy</p>
        </div>
        
        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {resourceCategories.map(resource => (
            <ResourceCard 
              key={resource.id} 
              title={resource.name}
              icon={resource.icon}
              description={resource.description}
              link={resource.link}
            />
          ))}
        </div>
        
        {/* Data Export Section */}
        <DataExport 
          buildings={buildings || []}
          exportFormat={exportFormat}
          setExportFormat={setExportFormat}
          buildingFilter={buildingFilter}
          setBuildingFilter={setBuildingFilter}
          issueTypeFilter={issueTypeFilter}
          setIssueTypeFilter={setIssueTypeFilter}
          dateRangeFilter={dateRangeFilter}
          setDateRangeFilter={setDateRangeFilter}
          onExport={handleExport}
        />
      </div>
    </section>
  );
};

export default Resources;
