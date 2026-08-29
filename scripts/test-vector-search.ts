// Test script for vector search functionality
import { storage } from '../server/storage';
import { computeEmbedding } from '../server/vector';

async function testVectorSearch() {
  console.log("Testing vector search functionality with OpenAI embeddings...");
  
  try {
    // Test basic embedding generation
    console.log("\n1. Testing basic embedding generation");
    const vector = await computeEmbedding('testing water leak in bathroom ceiling');
    console.log(`Embedding length: ${vector.length}`);
    console.log(`First 5 values: ${vector.slice(0, 5).join(', ')}`);
    
    // Test issue search
    console.log("\n2. Searching issues with query: 'leaking ceiling'");
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
    console.log("\n3. Searching buildings with query: 'Brooklyn'");
    const buildingResults = await storage.searchBuildingsByAddress('Brooklyn', 3);
    console.log(`Found ${buildingResults.length} results:`);
    buildingResults.forEach((building, i) => {
      console.log(`Result ${i + 1}: Building #${building.id}`);
      console.log(`  Address: ${building.address}, ${building.city}, ${building.state} ${building.zipCode}`);
      console.log(`  Landlord: ${building.landlord}`);
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