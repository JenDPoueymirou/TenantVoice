// Script to test our vector search functionality
require('dotenv').config();
const { storage } = require('../server/storage');

async function testVectorSearch() {
  console.log("Testing vector search functionality with OpenAI embeddings...");
  
  try {
    // Test issue search
    console.log("\n1. Searching issues with query: 'leaking ceiling'");
    const issueResults = await storage.searchIssues('leaking ceiling', 5);
    console.log(`Found ${issueResults.length} results:`);
    issueResults.forEach((issue, i) => {
      console.log(`Result ${i + 1}: Issue #${issue.id}`);
      console.log(`  Category: ${issue.category}`);
      console.log(`  SubIssues: ${issue.subIssues.join(', ')}`);
      console.log(`  Description: ${issue.description}`);
      console.log();
    });
    
    // Test building search
    console.log("\n2. Searching buildings with query: 'Brooklyn'");
    const buildingResults = await storage.searchBuildingsByAddress('Brooklyn', 3);
    console.log(`Found ${buildingResults.length} results:`);
    buildingResults.forEach((building, i) => {
      console.log(`Result ${i + 1}: Building #${building.id}`);
      console.log(`  Address: ${building.address}, ${building.city}, ${building.state} ${building.zipCode}`);
      console.log(`  Landlord: ${building.landlord}`);
      console.log();
    });
    
    // Test location-based issue search
    console.log("\n3. Searching issues by location: 'Manhattan'");
    const locationIssueResults = await storage.searchIssuesByLocation('Manhattan', 3);
    console.log(`Found ${locationIssueResults.length} results:`);
    locationIssueResults.forEach((issue, i) => {
      console.log(`Result ${i + 1}: Issue #${issue.id} at Building #${issue.buildingId}`);
      console.log(`  Category: ${issue.category}`);
      console.log(`  Description: ${issue.description}`);
      console.log();
    });
    
  } catch (error) {
    console.error("Error testing vector search:", error);
  }
}

// Run the test
testVectorSearch()
  .then(() => console.log("Vector search test completed."))
  .catch(err => console.error("Test failed:", err))
  .finally(() => process.exit());