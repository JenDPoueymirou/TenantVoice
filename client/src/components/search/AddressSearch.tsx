import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Home, AlertTriangle, UserX } from 'lucide-react';
import { apiRequest, getQueryFn } from '@/lib/queryClient';
import { formatDate } from '@/lib/utils';
import IssueCategoryRadios from '@/components/issues/IssueCategoryRadios';

type SearchMode = 'buildings' | 'issues' | 'displacement';

type Building = {
  id: number;
  address: string;
  unit: string | null;
  city: string;
  state: string;
  zipCode: string;
  landlord: string;
  createdAt: string;
};

type Issue = {
  id: number;
  buildingId: number;
  category: string;
  subIssues: string[];
  description: string;
  date: string;
  status: string;
  resolution: string | null;
  contactInfo: string | null;
  createdAt: string;
};

const AddressSearch = () => {
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState<SearchMode>('buildings');
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  // Define query endpoints for each search mode
  const endpoints = {
    buildings: `/api/buildings/search?q=${encodeURIComponent(query)}`,
    issues: `/api/issues/search?q=${encodeURIComponent(query)}`,
    displacement: `/api/issues/category/displacement?q=${encodeURIComponent(query)}`
  };

  // Sample displacement data with the new categories
  const sampleDisplacementIssues: Issue[] = [
    {
      id: 9001,
      buildingId: 1,
      category: "displacement",
      subIssues: ["identity_theft", "lack_of_funds"],
      description: "Tenant reported identity theft leading to financial problems and eventual displacement.",
      date: new Date().toISOString(),
      status: "open",
      resolution: null,
      contactInfo: "tenant@example.com",
      createdAt: new Date().toISOString()
    },
    {
      id: 9002,
      buildingId: 2,
      category: "displacement",
      subIssues: ["lack_of_funds", "harassment"],
      description: "Tenant faced both harassment and financial issues forcing them to leave the building.",
      date: new Date().toISOString(),
      status: "in progress",
      resolution: null,
      contactInfo: "tenant2@example.com",
      createdAt: new Date().toISOString()
    },
    {
      id: 9003,
      buildingId: 3,
      category: "displacement",
      subIssues: ["harassment", "lack_of_work"],
      description: "Tenant experienced workplace discrimination and harassment in the building.",
      date: new Date().toISOString(),
      status: "open",
      resolution: null,
      contactInfo: null,
      createdAt: new Date().toISOString()
    },
    {
      id: 9004,
      buildingId: 4,
      category: "displacement",
      subIssues: ["lack_of_work", "identity_theft"],
      description: "Tenant lost their job and also experienced identity theft, forcing them to move out.",
      date: new Date().toISOString(),
      status: "resolved",
      resolution: "Issue has been addressed and tenant provided assistance.",
      contactInfo: null,
      createdAt: new Date().toISOString()
    },
    {
      id: 9005,
      buildingId: 5,
      category: "displacement",
      subIssues: ["identity_theft", "other_displacement"],
      description: "Tenant had their identity stolen and also faced other challenges related to family circumstances.",
      date: new Date().toISOString(),
      status: "open",
      resolution: null,
      contactInfo: "tenant5@example.com",
      createdAt: new Date().toISOString()
    }
  ];

  // Query for search results
  const { data: apiData, isLoading, error } = useQuery({
    queryKey: [endpoints[searchMode]],
    queryFn: getQueryFn({ on401: 'returnNull' }),
    enabled: hasSearched && query.length > 0 && searchMode !== 'displacement',
  });
  
  // Use sample data for displacement or API data for other categories
  const data = searchMode === 'displacement' ? sampleDisplacementIssues : apiData;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() || searchMode === 'displacement') {
      setHasSearched(true);
    }
  };
  
  // Auto-display displacement issues when switching to that mode
  React.useEffect(() => {
    if (searchMode === 'displacement') {
      setHasSearched(true);
    }
  }, [searchMode]);
  
  const handleCategorySelect = (category: string, subcategory: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    
    // Use the main category as the search term to avoid overloading the search
    // The UI will still show that multiple items are selected
    const searchTerm = category.replace(/_/g, ' ');
    setQuery(searchTerm);
    setSearchMode('issues');
    
    // Trigger the search immediately
    setHasSearched(true);
    
    console.log(`Searching for: ${searchTerm}`);
  };

  // Get the correct results based on search mode
  const buildingResults = searchMode === 'buildings' ? data as Building[] : [];
  const issueResults = searchMode === 'issues' ? data as Issue[] : [];
  const displacementIssueResults = searchMode === 'displacement' ? data as Issue[] : [];

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to format category name
  const formatCategoryName = (category: string) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-6">
        {/* Search form moved above the buttons */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <Input
            type="text"
            placeholder={
              searchMode === 'buildings' 
                ? "Search buildings by address..." 
                : searchMode === 'issues'
                  ? "Search issues by description, category..."
                  : "Search for tenant displacement issues..."
            }
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            className="flex-1 shadow-sm"
          />
          <Button type="submit" disabled={isLoading} className="shadow-sm">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>
        
        {/* Search mode buttons */}
        <div className="flex space-x-4 mb-4">
          <Button 
            onClick={() => setSearchMode('buildings')}
            variant={searchMode === 'buildings' ? 'default' : 'outline'}
            className="shadow-sm"
          >
            <Home className="mr-2 h-4 w-4" />
            Buildings
          </Button>
          <Button 
            onClick={() => setSearchMode('issues')}
            variant={searchMode === 'issues' ? 'default' : 'outline'}
            className="shadow-sm"
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Issues
          </Button>
          <Button 
            onClick={() => setSearchMode('displacement')}
            variant={searchMode === 'displacement' ? 'default' : 'outline'}
            className="shadow-sm"
          >
            <UserX className="mr-2 h-4 w-4" />
            Tenant Displacement
          </Button>
        </div>
        
        {/* Issue Categories Filter with Radio Buttons */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Filter by Issue Categories</h3>
          <IssueCategoryRadios onCategorySelect={handleCategorySelect} />
        </div>
      </div>

      {isLoading && <p className="text-center py-4">Searching...</p>}
      
      {error && (
        <div className="text-red-500 p-4 border border-red-300 rounded bg-red-50 mb-4 shadow-sm">
          An error occurred while searching. Please try again.
        </div>
      )}

      {hasSearched && !isLoading && !error && (
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Buildings Search Results */}
          {searchMode === 'buildings' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Buildings Search Results</h3>
              {buildingResults?.length === 0 && <p>No buildings found matching your search.</p>}
              {buildingResults?.map((building) => (
                <Card key={building.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      {building.address} {building.unit ? `#${building.unit}` : ''}
                    </CardTitle>
                    <CardDescription>
                      {building.city}, {building.state} {building.zipCode}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Landlord:</span> {building.landlord}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0 text-xs text-gray-500">
                    Added on {formatDate(building.createdAt)}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Issues Search Results */}
          {searchMode === 'issues' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Issues Search Results</h3>
              {issueResults?.length === 0 && <p>No issues found matching your search.</p>}
              {issueResults?.map((issue) => (
                <Card key={issue.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        Issue #{issue.id} at Building #{issue.buildingId}
                      </CardTitle>
                      <Badge className={getStatusColor(issue.status)}>
                        {issue.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      Reported on {formatDate(issue.date)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-1 mb-2">
                      <Badge variant="outline" className="bg-blue-50">
                        {formatCategoryName(issue.category)}
                      </Badge>
                      {issue.subIssues.map((subIssue, i) => (
                        <Badge key={i} variant="outline" className="bg-blue-50">
                          {formatCategoryName(subIssue)}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm">{issue.description}</p>
                    {issue.resolution && (
                      <p className="mt-2 text-sm">
                        <span className="font-semibold">Resolution:</span> {issue.resolution}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Displacement Issues Search Results */}
          {searchMode === 'displacement' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Tenant Displacement Issues</h3>
              {displacementIssueResults?.length === 0 && <p>No displacement issues found matching your search.</p>}
              {displacementIssueResults?.map((issue) => (
                <Card key={issue.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        Issue #{issue.id} at Building #{issue.buildingId}
                      </CardTitle>
                      <Badge className={getStatusColor(issue.status)}>
                        {issue.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      Reported on {formatDate(issue.date)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-1 mb-2">
                      <Badge variant="outline" className="bg-red-50 text-red-800 px-3 py-1 text-sm">
                        {formatCategoryName(issue.category)}
                      </Badge>
                    </div>
                    
                    {/* Group displacement subcategories */}
                    <div className="flex flex-col mt-2 w-full border rounded-md p-3 mb-3 bg-gray-50">
                      <p className="text-md font-bold mb-2">Forced Abandonment Reasons:</p>
                      <div className="flex flex-wrap gap-2">
                        {issue.subIssues.map((subIssue, i) => {
                          let badgeClass = "bg-red-100 text-red-800";
                          
                          // Apply different styling to special subcategories
                          if (subIssue === "identity_theft") badgeClass = "bg-purple-100 text-purple-800 font-medium";
                          if (subIssue === "lack_of_funds") badgeClass = "bg-yellow-100 text-yellow-800 font-medium";
                          if (subIssue === "harassment") badgeClass = "bg-orange-100 text-orange-800 font-medium";
                          if (subIssue === "lack_of_work") badgeClass = "bg-blue-100 text-blue-800 font-medium";
                          
                          return (
                            <Badge key={i} variant="outline" className={`${badgeClass} px-3 py-1 text-sm`}>
                              {formatCategoryName(subIssue)}
                            </Badge>
                          );
                        })}
                      </div>
                      
                      {issue.subIssues.includes("other_displacement") && (
                        <div className="mt-3 p-3 border rounded border-red-200 bg-red-50">
                          <p className="text-sm font-semibold">Other reason:</p>
                          <p className="text-sm italic">{issue.description}</p>
                        </div>
                      )}
                    </div>
                    <p className="text-sm">{issue.description}</p>
                    {issue.resolution && (
                      <p className="mt-2 text-sm">
                        <span className="font-semibold">Resolution:</span> {issue.resolution}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressSearch;