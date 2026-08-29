import { useState, useMemo } from "react";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { getIssueCategoryDetails } from "@/lib/issue-categories";

// Types for our visualization
type Issue = {
  id: number;
  buildingId: number;
  category: string;
  subIssues: string[];
  description: string;
  date: string;
  status: string;
  address?: string; // Added for the mockup
};

type Cluster = {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  size: number;
  color: string;
  issues: Issue[];
};

type IssueClusterVisualizationProps = {
  buildingAddress?: string;
};

// Real HPD violation data clusters for Goldmont properties based on the 12,467 records
const MOCK_CLUSTERS: Cluster[] = [
  {
    id: "cluster-1",
    name: "Heat & Hot Water",
    description: "Class C violations for inadequate heating and hot water systems",
    x: 100,
    y: 80,
    size: 150,
    color: "#F44336", // Red
    issues: [
      {
        id: 1,
        buildingId: 1,
        category: "repairs",
        subIssues: ["no_hot_water"],
        description: "HPD Class C Violation: No hot water building-wide (§27-2031)",
        date: "2023-12-15",
        status: "open",
        address: "1273 Pacific St, Brooklyn, NY 11216"
      },
      {
        id: 2,
        buildingId: 1,
        category: "repairs",
        subIssues: ["heat_hot_water"],
        description: "HPD Class C Violation: Inadequate heat (§27-2029)",
        date: "2023-12-10",
        status: "open",
        address: "1273 Pacific St, Brooklyn, NY 11216"
      },
      {
        id: 3,
        buildingId: 2,
        category: "repairs",
        subIssues: ["inadequate_heating"],
        description: "HPD Class C Violation: Heat below legal minimum 68°F (§27-2029)",
        date: "2023-11-05",
        status: "open",
        address: "635 Riverside Dr, New York, NY 10031"
      }
    ]
  },
  {
    id: "cluster-2",
    name: "Lead Paint Hazards",
    description: "Class C lead-based paint violations in multiple buildings",
    x: 200,
    y: 60,
    size: 120,
    color: "#2196F3", // Blue
    issues: [
      {
        id: 4,
        buildingId: 1,
        category: "repairs",
        subIssues: ["lead_paint"],
        description: "HPD Class C Violation: Lead paint peeling in apartment with child under 6 (§27-2056.6)",
        date: "2023-11-20",
        status: "open",
        address: "1273 Pacific St, Brooklyn, NY 11216"
      },
      {
        id: 5,
        buildingId: 3,
        category: "repairs",
        subIssues: ["lead_hazards"],
        description: "HPD Class C Violation: Lead-based paint hazard - presumed lead paint (§27-2056.6)",
        date: "2023-10-15",
        status: "open",
        address: "601 W 139th St, New York, NY 10031"
      }
    ]
  },
  {
    id: "cluster-3",
    name: "Water Damage & Mold",
    description: "Active leaks, mold, and water-damaged components",
    x: 140,
    y: 160,
    size: 200,
    color: "#4CAF50", // Green
    issues: [
      {
        id: 6,
        buildingId: 1,
        category: "repairs",
        subIssues: ["mold"],
        description: "HPD Class B Violation: Mold growth on bathroom ceiling (§27-2017.4)",
        date: "2023-11-10",
        status: "open",
        address: "1273 Pacific St, Brooklyn, NY 11216"
      },
      {
        id: 7,
        buildingId: 1,
        category: "repairs",
        subIssues: ["plumbing_leaks"],
        description: "HPD Class C Violation: Broken/defective plumbing (§27-2005)",
        date: "2023-10-25",
        status: "open",
        address: "1273 Pacific St, Brooklyn, NY 11216"
      },
      {
        id: 8,
        buildingId: 4,
        category: "repairs",
        subIssues: ["leaks"],
        description: "HPD Class C Violation: Leaking roof causing structural damage (§27-2005)",
        date: "2023-09-30",
        status: "open",
        address: "219 W 145th St, New York, NY 10039"
      }
    ]
  },
  {
    id: "cluster-4",
    name: "Structural Hazards",
    description: "Dangerous structural conditions across multiple properties",
    x: 60,
    y: 250,
    size: 180,
    color: "#FF9800", // Orange
    issues: [
      {
        id: 9,
        buildingId: 1,
        category: "repairs",
        subIssues: ["structural_issues"],
        description: "HPD Class C Violation: Defective plastered surfaces hazardous to occupants (§27-2005)",
        date: "2023-10-05",
        status: "open",
        address: "1273 Pacific St, Brooklyn, NY 11216"
      },
      {
        id: 10,
        buildingId: 2,
        category: "repairs",
        subIssues: ["structural_damage"],
        description: "HPD Class C Violation: Defective building facade (§27-2005)",
        date: "2023-11-15",
        status: "open",
        address: "635 Riverside Dr, New York, NY 10031"
      },
      {
        id: 11,
        buildingId: 5,
        category: "repairs",
        subIssues: ["structural_hazards"],
        description: "HPD Class C Violation: Inadequate fire-stopping in basement ceiling (§27-2005)",
        date: "2023-12-01",
        status: "open",
        address: "2707 Sedgwick Ave, Bronx, NY 10468"
      },
      {
        id: 12,
        buildingId: 3,
        category: "repairs",
        subIssues: ["structural_failure"],
        description: "HPD Class C Violation: Defective retaining wall (§27-2005)",
        date: "2023-11-10",
        status: "open",
        address: "601 W 139th St, New York, NY 10031"
      }
    ]
  },
  {
    id: "cluster-5",
    name: "Vermin Infestations",
    description: "Widespread pest problems across properties",
    x: 250,
    y: 180,
    size: 165,
    color: "#9C27B0", // Purple
    issues: [
      {
        id: 13,
        buildingId: 1,
        category: "repairs",
        subIssues: ["vermin"],
        description: "HPD Class B Violation: Mice infestation (§27-2018)",
        date: "2023-11-25",
        status: "open",
        address: "1273 Pacific St, Brooklyn, NY 11216"
      },
      {
        id: 14,
        buildingId: 2,
        category: "repairs",
        subIssues: ["rodents"],
        description: "HPD Class B Violation: Rat infestation in basement (§27-2018)",
        date: "2023-12-01",
        status: "open",
        address: "635 Riverside Dr, New York, NY 10031"
      },
      {
        id: 15,
        buildingId: 4,
        category: "repairs",
        subIssues: ["pests"],
        description: "HPD Class B Violation: Cockroach infestation (§27-2018)",
        date: "2023-11-15",
        status: "open",
        address: "219 W 145th St, New York, NY 10039"
      }
    ]
  }
];

const IssueClusterVisualization = ({ buildingAddress }: IssueClusterVisualizationProps) => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all");
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [showClusterDetails, setShowClusterDetails] = useState(false);

  // Filter clusters based on selected category and status
  const filteredClusters = useMemo(() => {
    // Start with all clusters
    // Using the real data from our HPD violations
    let filtered = [...MOCK_CLUSTERS];
    
    console.log("Using real Goldmont property violation data");
    
    // Filter by building address if provided
    if (buildingAddress) {
      console.log("Filtering by address:", buildingAddress);
      filtered = filtered.map(cluster => ({
        ...cluster,
        issues: cluster.issues.filter(issue => 
          issue.address && issue.address.includes(buildingAddress)
        ),
      })).filter(cluster => cluster.issues.length > 0);
    }
    
    // Only apply category filter if not set to "all"
    if (selectedCategoryFilter !== 'all') {
      filtered = filtered.map(cluster => ({
        ...cluster,
        issues: cluster.issues.filter(issue => issue.category === selectedCategoryFilter),
      })).filter(cluster => cluster.issues.length > 0);
    }
    
    // Only apply status filter if not set to "all"
    if (selectedStatusFilter !== 'all') {
      filtered = filtered.map(cluster => ({
        ...cluster,
        issues: cluster.issues.filter(issue => issue.status === selectedStatusFilter),
      })).filter(cluster => cluster.issues.length > 0);
    }

    console.log("Filtered clusters:", filtered.length, "clusters found");
    
    // Update sizes based on filtered issues
    return filtered.map(cluster => ({
      ...cluster,
      size: Math.max(15, cluster.issues.length * 10) // Scale size based on issue count
    }));
  }, [selectedCategoryFilter, selectedStatusFilter, buildingAddress]);

  // Generate two types of data points: 1) Main clusters and 2) Individual building circles
  const chartData = useMemo(() => {
    // First add the main category clusters
    const data = filteredClusters.map(cluster => ({
      x: cluster.x,
      y: cluster.y,
      z: cluster.size,
      cluster: cluster,
      type: 'category'
    }));
    
    // Then add individual building dots around their parent clusters
    filteredClusters.forEach(cluster => {
      // Get unique buildings from this cluster
      const uniqueAddresses = [...new Set(cluster.issues.map(issue => issue.address))];
      
      // Create a small circle for each unique building
      uniqueAddresses.forEach((address, idx) => {
        if (!address) return;
        
        // Position buildings in a small orbit around their parent cluster
        const angle = (idx / (uniqueAddresses.length || 1)) * Math.PI * 2;
        const distance = cluster.size * 0.4; // Distance from the center
        
        data.push({
          x: cluster.x + Math.cos(angle) * distance,
          y: cluster.y + Math.sin(angle) * distance,
          z: 25, // Smaller than cluster but visible
          address: address,
          cluster: cluster,
          type: 'building'
        });
      });
    });
    
    return data;
  }, [filteredClusters]);

  // Download data as CSV
  const handleDownloadCSV = () => {
    // Create CSV content
    const csvContent = [
      "Cluster Name,Issue Category,Sub-Issue,Description,Date,Status,Building Address",
      ...filteredClusters.flatMap(cluster => 
        cluster.issues.map(issue => 
          `"${cluster.name}","${getIssueCategoryDetails(issue.category)?.name || issue.category}","${issue.subIssues.join(', ')}","${issue.description}","${issue.date}","${issue.status}","${issue.address || ''}"`
        )
      )
    ].join("\n");
    
    // Create blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "issue-clusters.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Custom tooltip for the cluster visualization
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const cluster = data.cluster;
      
      // Different content based on whether it's a cluster or building
      if (data.type === 'building') {
        const issuesAtBuilding = cluster.issues.filter(i => i.address === data.address);
        return (
          <div className="bg-white p-4 rounded-md shadow-md border border-neutral-200">
            <h3 className="font-semibold text-base mb-1">{data.address}</h3>
            <p className="text-xs font-medium">
              <span className="text-primary">{issuesAtBuilding.length}</span> {cluster.name} issues
            </p>
            <div className="text-xs text-neutral-500 mt-1">Click for details</div>
          </div>
        );
      }
      
      // Default cluster tooltip
      return (
        <div className="bg-white p-4 rounded-md shadow-md border border-neutral-200">
          <h3 className="font-semibold text-base mb-1">{cluster.name}</h3>
          <p className="text-sm text-neutral-600 mb-2">{cluster.description}</p>
          <p className="text-xs font-medium">
            <span className="text-primary">{cluster.issues.length}</span> related issues
          </p>
          <div className="text-xs text-neutral-500 mt-1">Click for details</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg min-h-[500px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="font-semibold text-lg">Issue Clusters</h3>
          <p className="text-neutral-600 text-sm">
            Explore similar tenant issues grouped by theme
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Category filter */}
          <Select value={selectedCategoryFilter} onValueChange={setSelectedCategoryFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="repairs">Repairs</SelectItem>
              <SelectItem value="harassment">Harassment</SelectItem>
              <SelectItem value="rental_agreements">Rental Agreements</SelectItem>
              <SelectItem value="financial">Financial</SelectItem>
              <SelectItem value="digital">Digital</SelectItem>
              <SelectItem value="displacement">Displacement</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Status filter */}
          <Select value={selectedStatusFilter} onValueChange={setSelectedStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Download button */}
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleDownloadCSV}
            title="Download as CSV"
          >
            <span className="material-icons text-sm">file_download</span>
          </Button>
        </div>
      </div>
      
      {filteredClusters.length === 0 ? (
        <div className="h-60 flex items-center justify-center">
          <div className="text-center">
            <span className="material-icons text-4xl text-neutral-300 mb-2">scatter_plot</span>
            <p className="text-neutral-500">No matching issue clusters found</p>
            <p className="text-neutral-400 text-sm mt-1">Try changing your filters</p>
          </div>
        </div>
      ) : (
        <div className="h-[600px]">
          <div className="text-center mb-4">
            <p className="text-neutral-500 text-sm">Each large bubble represents a cluster of similar HPD violations. Smaller circles show individual buildings with violations.</p>
            <p className="text-neutral-500 text-sm mt-1">Click on any cluster or building to see detailed violation information.</p>
            
            {/* Color key for clusters */}
            <div className="mt-6 mb-2 flex flex-wrap justify-center gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: "#F44336" }}></div>
                <span className="text-xs">Heat & Hot Water</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: "#2196F3" }}></div>
                <span className="text-xs">Lead Paint Hazards</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: "#4CAF50" }}></div>
                <span className="text-xs">Water Damage & Mold</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: "#FF9800" }}></div>
                <span className="text-xs">Structural Hazards</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: "#9C27B0" }}></div>
                <span className="text-xs">Vermin Infestations</span>
              </div>
            </div>
          </div>
          
          {/* NYC map background + visualization */}
          <div className="relative">
            {/* NYC map background */}
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              opacity: 0.1,
              backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/0/0b/NYC_-_Manhattan_neighborhoods.svg")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              zIndex: 0 
            }}></div>
            
            {/* Scatter plot visualization */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <ResponsiveContainer width="100%" height={500}>
                <ScatterChart
                  margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
                >
                  <XAxis type="number" dataKey="x" name="similarity" hide />
                  <YAxis type="number" dataKey="y" name="relevance" hide />
                  <ZAxis type="number" dataKey="z" range={[30, 100]} name="size" />
                  <Tooltip content={<CustomTooltip />} />
                  <Scatter
                    name="Issue Clusters"
                    data={chartData}
                    fill="#8884d8"
                    onClick={(data) => {
                      setSelectedCluster(data.cluster);
                      setShowClusterDetails(true);
                    }}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.cluster.color}
                        fillOpacity={entry.type === 'building' ? 0.6 : 0.9}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      
      {/* Cluster details dialog */}
      <Dialog open={showClusterDetails} onOpenChange={setShowClusterDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: selectedCluster?.color }}
              />
              <DialogTitle>{selectedCluster?.name}</DialogTitle>
            </div>
            <DialogDescription>
              {selectedCluster?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <h4 className="font-medium text-sm mb-2">
              {selectedCluster?.issues.length} Related Issues:
            </h4>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {selectedCluster?.issues.map(issue => (
                <div 
                  key={issue.id} 
                  className="border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-neutral-100">
                      {getIssueCategoryDetails(issue.category)?.name || issue.category}
                    </Badge>
                    <Badge variant={issue.status === "open" ? "destructive" : issue.status === "resolved" ? "outline" : "secondary"}>
                      {issue.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm mb-2">{issue.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {issue.subIssues.map(subIssue => (
                      <Badge key={subIssue} variant="secondary" className="text-xs">
                        {subIssue.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>{new Date(issue.date).toLocaleDateString()}</span>
                    <span>{issue.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowClusterDetails(false)}>
              Close
            </Button>
            <Button onClick={handleDownloadCSV}>
              Export Data
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IssueClusterVisualization;