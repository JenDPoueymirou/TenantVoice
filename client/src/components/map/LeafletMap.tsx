import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { goldmontProperties, Property } from '@/data/goldmont-properties';

// Setup default icons for Leaflet
// Using CDN URLs to avoid bundling issues
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

type LeafletMapProps = {
  buildings?: Property[];
  height?: string;
  width?: string;
  showControls?: boolean;
  interactive?: boolean;
  onBuildingClick?: (buildingId: number) => void;
};

const LeafletMap = ({
  buildings = goldmontProperties,
  height = '500px',
  width = '100%',
  showControls = true,
  interactive = true,
  onBuildingClick
}: LeafletMapProps) => {
  const [selectedBuilding, setSelectedBuilding] = useState<Property | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  
  // Make sure the map is mounted
  useEffect(() => {
    setTimeout(() => {
      setMapLoaded(true);
    }, 500);
  }, []);
  
  const handleBuildingClick = (building: Property) => {
    setSelectedBuilding(building);
    if (onBuildingClick) {
      onBuildingClick(building.id);
    }
  };
  
  const getBuildingStatusColor = (issueCount: number, highPriorityCount: number) => {
    if (highPriorityCount >= 8) return 'bg-red-500';
    if (issueCount >= 100) return 'bg-orange-500';
    if (issueCount >= 30) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const getMarkerIcon = () => {
    return DefaultIcon;
  };
  
  const getFilteredBuildings = () => {
    switch(filterType) {
      case 'low':
        return buildings.filter(b => b.issueCount < 30);
      case 'medium':
        return buildings.filter(b => b.issueCount >= 30 && b.issueCount < 100);
      case 'high':
        return buildings.filter(b => b.issueCount >= 100);
      case 'critical':
        return buildings.filter(b => b.highPriorityCount >= 8);
      default:
        return buildings;
    }
  };
  
  // New York City center coordinates for the map
  const nycCenter: [number, number] = [40.7128, -74.0060];
  
  return (
    <div className="rounded-lg overflow-hidden" style={{ width }}>
      {!mapLoaded ? (
        <div className="bg-neutral-100 flex items-center justify-center" style={{ height }}>
          <div className="text-neutral-500">Loading map data...</div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="relative" style={{ height }}>
            <div className="absolute top-2 right-2 z-10 bg-white/90 rounded-md shadow p-2 flex space-x-2">
              <Button 
                size="sm" 
                variant={filterType === 'all' ? "default" : "outline"}
                onClick={() => setFilterType('all')}
                className="text-xs"
                title="Show all properties"
              >
                All
              </Button>
              <Button 
                size="sm" 
                variant={filterType === 'low' ? "default" : "outline"}
                onClick={() => setFilterType('low')}
                className="text-xs"
                title="Under 30 HPD Violations"
              >
                Low
              </Button>
              <Button 
                size="sm" 
                variant={filterType === 'medium' ? "default" : "outline"}
                onClick={() => setFilterType('medium')}
                className="text-xs"
                title="30-99 HPD Violations"
              >
                Medium
              </Button>
              <Button 
                size="sm" 
                variant={filterType === 'high' ? "default" : "outline"}
                onClick={() => setFilterType('high')}
                className="text-xs"
                title="100+ HPD Violations"
              >
                High
              </Button>
              <Button 
                size="sm" 
                variant={filterType === 'critical' ? "default" : "outline"}
                onClick={() => setFilterType('critical')}
                className="text-xs"
                title="8+ High Priority Violations"
              >
                Critical
              </Button>
            </div>
            
            <MapContainer
              center={nycCenter}
              zoom={11}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {showControls && <ZoomControl position="bottomright" />}
              
              {getFilteredBuildings().map((building) => (
                <Marker
                  key={building.id}
                  position={[building.lat, building.lng]}
                  icon={getMarkerIcon()}
                  eventHandlers={{
                    click: () => handleBuildingClick(building)
                  }}
                >
                  <Tooltip>
                    <div className="text-xs font-medium">
                      {building.address}
                      <br />
                      HPD Violations: {building.issueCount}
                    </div>
                  </Tooltip>
                  
                  <Popup className="building-popup">
                    <div className="p-1">
                      <h3 className="font-medium text-sm mb-1">{building.address}</h3>
                      <p className="text-xs text-neutral-600 mb-1">{building.borough}, {building.zipCode}</p>
                      <div className="text-xs text-neutral-600">
                        <div className="flex items-center justify-between mb-1">
                          <span>HPD Violations:</span>
                          <Badge variant="outline">{building.issueCount}</Badge>
                        </div>
                        <div className="flex items-center justify-between mb-1">
                          <span>Open Issues:</span>
                          <Badge variant="outline">{building.openIssues}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>High Priority:</span>
                          <Badge variant={building.highPriorityCount > 0 ? "destructive" : "outline"}>
                            {building.highPriorityCount}
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="mt-2 p-0 h-auto text-xs"
                        onClick={() => {
                          if (onBuildingClick) {
                            onBuildingClick(building.id);
                          }
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          
          <div className="bg-white shadow-sm p-3 mt-4 rounded text-xs">
            <div className="font-medium mb-1">Map Legend</div>
            <div className="text-xs">
              Click on any marker to view details about HPD violations at that property.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;