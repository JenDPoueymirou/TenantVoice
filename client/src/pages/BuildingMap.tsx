import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LeafletMap from '@/components/map/LeafletMap';
import SimpleMap from '@/components/map/SimpleMap';
import HistoricalAnalysis from '@/components/upload/HistoricalAnalysis';

const BuildingMap = () => {
  const [selectedTab, setSelectedTab] = useState<string>("map");
  const [selectedBuilding, setSelectedBuilding] = useState<number | null>(null);
  const [filterIssueType, setFilterIssueType] = useState<string>("all");
  const [filterTimeRange, setFilterTimeRange] = useState<string>("all");
  
  const handleBuildingClick = (buildingId: number) => {
    setSelectedBuilding(buildingId);
    console.log('Building clicked:', buildingId);
    // Here you would typically fetch detailed data about this building
  };
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Building Issues Map</h1>
          
          <Tabs defaultValue="map" onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="analysis">Data Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="map" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>New York City Building Issues</CardTitle>
                      <CardDescription>
                        Interactive map of reported issues at Goldmont properties
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <LeafletMap 
                        onBuildingClick={handleBuildingClick}
                        height="600px"
                      />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="issue-type">Issue Type</Label>
                          <div className="mt-1">
                            <Tabs value={filterIssueType} onValueChange={setFilterIssueType} className="w-full">
                              <TabsList className="grid grid-cols-3 mb-2">
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="repairs">Repairs</TabsTrigger>
                                <TabsTrigger value="harassment">Harassment</TabsTrigger>
                              </TabsList>
                              <TabsList className="grid grid-cols-3">
                                <TabsTrigger value="lease">Lease</TabsTrigger>
                                <TabsTrigger value="financial">Financial</TabsTrigger>
                                <TabsTrigger value="displacement">Displacement</TabsTrigger>
                              </TabsList>
                            </Tabs>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="time-range">Time Range</Label>
                          <div className="mt-1">
                            <Tabs value={filterTimeRange} onValueChange={setFilterTimeRange} className="w-full">
                              <TabsList className="grid grid-cols-3 mb-2">
                                <TabsTrigger value="all">All Time</TabsTrigger>
                                <TabsTrigger value="30">30 Days</TabsTrigger>
                                <TabsTrigger value="90">90 Days</TabsTrigger>
                              </TabsList>
                              <TabsList className="grid grid-cols-2">
                                <TabsTrigger value="180">6 Months</TabsTrigger>
                                <TabsTrigger value="365">1 Year</TabsTrigger>
                              </TabsList>
                            </Tabs>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="building-search">Search by Address</Label>
                          <div className="flex gap-2">
                            <Input 
                              id="building-search" 
                              placeholder="Enter address"
                            />
                            <Button size="sm" className="flex-shrink-0">
                              <span className="material-icons text-sm">search</span>
                            </Button>
                          </div>
                        </div>
                        
                        {selectedBuilding && (
                          <div className="border-t pt-4 mt-4">
                            <h3 className="font-medium text-sm mb-2">Selected Building</h3>
                            <p className="text-sm text-neutral-600">
                              1273 Pacific St, Brooklyn, NY 11216
                            </p>
                            <div className="mt-2 space-y-1">
                              <p className="text-xs text-neutral-500">
                                <span className="font-medium">Total Issues:</span> 17
                              </p>
                              <p className="text-xs text-neutral-500">
                                <span className="font-medium">High Priority:</span> 5
                              </p>
                              <p className="text-xs text-neutral-500">
                                <span className="font-medium">Latest Report:</span> Apr 15, 2023
                              </p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-3 w-full"
                            >
                              View Detailed Report
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="list">
              <Card>
                <CardHeader>
                  <CardTitle>Building List View</CardTitle>
                  <CardDescription>
                    Table view of all buildings with reported issues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-neutral-500">
                    Building list view is under development and will be available in the next update.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analysis">
              <HistoricalAnalysis />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default BuildingMap;