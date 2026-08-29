import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Building data type
type Building = {
  id: number;
  address: string;
  coordinates: [number, number]; // [longitude, latitude]
  issueCount: number;
  highPriorityCount: number;
};

type SimpleMapProps = {
  buildings?: Building[];
  height?: string;
  width?: string;
  onBuildingClick?: (buildingId: number) => void;
};

const SimpleMap = ({
  buildings = [],
  height = '500px',
  width = '100%',
  onBuildingClick
}: SimpleMapProps) => {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Sample building data if none provided
  useEffect(() => {
    if (buildings.length === 0) {
      // This is sample data - in a real app, this would come from the database
      const sampleBuildings: Building[] = [
        {
          id: 1,
          address: '1273 Pacific St, Brooklyn, NY 11216',
          coordinates: [-73.9507, 40.6781],
          issueCount: 17,
          highPriorityCount: 5
        },
        {
          id: 2,
          address: '555 Bedford Ave, Brooklyn, NY 11211',
          coordinates: [-73.9559, 40.7168],
          issueCount: 8,
          highPriorityCount: 2
        },
        {
          id: 3,
          address: '100 W 144th St, Manhattan, NY 10030',
          coordinates: [-73.9415, 40.8217],
          issueCount: 12,
          highPriorityCount: 3
        },
        {
          id: 4,
          address: '210 Gates Ave, Brooklyn, NY 11238',
          coordinates: [-73.9626, 40.6871],
          issueCount: 5,
          highPriorityCount: 1
        }
      ];
      
      // This is just for the demo - don't actually mutate props
      (buildings as Building[]).push(...sampleBuildings);
    }
    
    setTimeout(() => {
      setMapLoaded(true);
    }, 500);
  }, [buildings]);
  
  const handleBuildingClick = (building: Building) => {
    setSelectedBuilding(building);
    if (onBuildingClick) {
      onBuildingClick(building.id);
    }
  };
  
  const getBuildingStatusColor = (issueCount: number, highPriorityCount: number) => {
    if (highPriorityCount >= 3) return 'bg-red-500';
    if (issueCount >= 10) return 'bg-orange-500';
    if (issueCount >= 5) return 'bg-yellow-500';
    return 'bg-blue-500';
  };
  
  const renderBuildingCircle = (building: Building) => {
    const color = getBuildingStatusColor(building.issueCount, building.highPriorityCount);
    return (
      <div 
        className={`${color} w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-xs cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-110`}
        title={`${building.issueCount} total issues, ${building.highPriorityCount} high priority`}
        onClick={(e) => {
          e.stopPropagation();
          handleBuildingClick(building);
        }}
      >
        {building.issueCount}
      </div>
    );
  };
  
  const loadingView = (
    <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
      <div className="text-neutral-500">Loading map data...</div>
    </div>
  );
  
  const renderBuildings = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[500px]">
      {buildings.map((building) => (
        <Card 
          key={building.id} 
          className={`cursor-pointer overflow-hidden ${selectedBuilding?.id === building.id ? 'ring-2 ring-primary' : ''}`}
          onClick={() => handleBuildingClick(building)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-sm">{building.address}</h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Coordinates: {building.coordinates[1].toFixed(4)}, {building.coordinates[0].toFixed(4)}
                </p>
              </div>
              {renderBuildingCircle(building)}
            </div>
            
            <div className="mt-3 pt-3 border-t border-neutral-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs">Total Issues:</span>
                <Badge variant="outline">{building.issueCount}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">High Priority:</span>
                <Badge variant={building.highPriorityCount > 0 ? "destructive" : "outline"}>
                  {building.highPriorityCount}
                </Badge>
              </div>
              <Button 
                variant="link" 
                size="sm" 
                className="mt-2 p-0 h-auto text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onBuildingClick) {
                    onBuildingClick(building.id);
                  }
                }}
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
  
  const legend = (
    <div className="bg-white/90 p-2 rounded text-xs my-4">
      <div className="mb-1 font-medium">Issue Count Legend</div>
      <div className="flex items-center space-x-3">
        <button 
          className="flex items-center rounded-full p-1 hover:bg-blue-50 transition-colors duration-200"
          title="Show low priority issues (less than 5)"
          onClick={() => alert("Showing low priority issues")}
        >
          <div className="w-4 h-4 rounded-full bg-blue-500 mr-1 hover:shadow-md transition-shadow"></div>
          <span>&lt; 5</span>
        </button>
        <button 
          className="flex items-center rounded-full p-1 hover:bg-yellow-50 transition-colors duration-200"
          title="Show medium priority issues (5-9)"
          onClick={() => alert("Showing medium priority issues")}
        >
          <div className="w-4 h-4 rounded-full bg-yellow-500 mr-1 hover:shadow-md transition-shadow"></div>
          <span>5-9</span>
        </button>
        <button 
          className="flex items-center rounded-full p-1 hover:bg-orange-50 transition-colors duration-200"
          title="Show high priority issues (10+)"
          onClick={() => alert("Showing high priority issues")}
        >
          <div className="w-4 h-4 rounded-full bg-orange-500 mr-1 hover:shadow-md transition-shadow"></div>
          <span>10+</span>
        </button>
        <button 
          className="flex items-center rounded-full p-1 hover:bg-red-50 transition-colors duration-200"
          title="Show critical priority issues"
          onClick={() => alert("Showing critical issues")}
        >
          <div className="w-4 h-4 rounded-full bg-red-500 mr-1 hover:shadow-md transition-shadow"></div>
          <span>Critical</span>
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="relative bg-white rounded-lg border overflow-hidden" style={{ height, width }}>
      {!mapLoaded ? loadingView : (
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Building Issues Overview</h3>
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => alert("Map view is currently under development")}
              >
                Map View (Coming Soon)
              </Button>
            </div>
          </div>
          
          <p className="text-sm text-neutral-500 mb-4">
            Showing {buildings.length} buildings with reported issues. Hover over the issue count circles to see more details.
          </p>
          
          {legend}
          {renderBuildings()}
        </div>
      )}
    </div>
  );
};

export default SimpleMap;