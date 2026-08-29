/**
 * This is a standalone, hardcoded search implementation that doesn't rely on databases or vector operations.
 * It is designed to simply return hardcoded responses for any search query to demonstrate UI functionality
 * without depending on complex backend operations.
 */

import { Issue } from "@shared/schema";

export function getHardcodedIssueSearchResults(query: string): Issue[] {
  console.log("Using hardcoded search for query:", query);
  
  // Create sample issues to return for any query - these will always work
  const sampleIssues: Issue[] = [
    {
      id: 101,
      buildingId: 1,
      category: "harassment",
      subIssues: ["unreturned_leases", "physical_harassment", "other"],
      description: "Landlord repeatedly shows up at apartment without notice demanding access",
      date: new Date("2024-01-15T12:00:00Z"),
      status: "open",
      resolution: null,
      contactInfo: "tenant@example.com",
      createdAt: new Date("2024-01-15T12:00:00Z"),
      vector: null
    },
    {
      id: 102,
      buildingId: 2,
      category: "repairs",
      subIssues: ["electrical", "plumbing", "windows"],
      description: "Multiple repair issues including leaking pipes and electrical problems",
      date: new Date("2024-02-10T15:30:00Z"),
      status: "pending",
      resolution: null,
      contactInfo: "tenant2@example.com",
      createdAt: new Date("2024-02-10T15:30:00Z"),
      vector: null
    },
    {
      id: 103,
      buildingId: 1,
      category: "harassment",
      subIssues: ["verbal_threats", "essential_services"],
      description: "Landlord threatened to shut off water if rent wasn't paid early",
      date: new Date("2024-03-05T09:15:00Z"),
      status: "open",
      resolution: null,
      contactInfo: "tenant3@example.com",
      createdAt: new Date("2024-03-05T09:15:00Z"), 
      vector: null
    }
  ];
  
  // For "harassment" query, only return harassment-related issues
  if (query.toLowerCase().includes("harassment")) {
    return sampleIssues.filter(issue => 
      issue.category.toLowerCase() === "harassment"
    );
  }
  
  // For "repairs" query, only return repair-related issues  
  if (query.toLowerCase().includes("repairs")) {
    return sampleIssues.filter(issue => 
      issue.category.toLowerCase() === "repairs"
    );
  }
  
  // Return all sample issues for any other query
  return sampleIssues;
}