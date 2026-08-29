import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const HistoricalAnalysis = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Historical Data Analysis</CardTitle>
          <CardDescription>
            Track and analyze tenant issue patterns over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold mb-4">Coming Soon</h3>
            <p className="text-neutral-500 max-w-xl mx-auto mb-6">
              Our historical data analysis tools are under development. 
              This feature will allow tenants to track issue patterns, identify trends, 
              and generate visual reports to support advocacy efforts.
            </p>
            
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Development Progress</span>
                <span className="text-sm font-medium">35%</span>
              </div>
              <Progress value={35} className="h-2" />
            </div>
            
            <Tabs defaultValue="planned">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="planned">Planned Features</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              
              <TabsContent value="planned" className="mt-4 text-left">
                <ul className="space-y-2 max-w-md mx-auto">
                  <li className="flex items-center">
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">In Progress</span>
                    <span>Time-series analysis of tenant issues</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">In Progress</span>
                    <span>Issue correlation detection</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">Planned</span>
                    <span>Pattern identification across buildings</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">Planned</span>
                    <span>Export tools for advocacy reports</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">Planned</span>
                    <span>Historical data visualization</span>
                  </li>
                </ul>
              </TabsContent>
              
              <TabsContent value="timeline" className="mt-4 text-left">
                <ul className="max-w-md mx-auto space-y-1 text-gray-500 list-disc list-inside">
                  <li>Initial data structure design - <span className="text-green-600 font-medium">Complete</span></li>
                  <li>Backend data storage implementation - <span className="text-green-600 font-medium">Complete</span></li>
                  <li>Basic analytics processing - <span className="text-yellow-600 font-medium">In Progress</span></li>
                  <li>UI implementation - <span className="text-neutral-600 font-medium">Starting May 2023</span></li>
                  <li>Advanced pattern recognition - <span className="text-neutral-600 font-medium">Starting June 2023</span></li>
                  <li>Full release - <span className="text-neutral-600 font-medium">July 2023</span></li>
                </ul>
              </TabsContent>
              
              <TabsContent value="preview" className="mt-4">
                <div className="max-w-md mx-auto bg-neutral-100 rounded-lg p-8 flex items-center justify-center">
                  <p className="text-neutral-500 italic">Preview visuals will be available soon</p>
                </div>
              </TabsContent>
            </Tabs>
            
            <Button className="mt-8" variant="outline">Subscribe for Updates</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoricalAnalysis;