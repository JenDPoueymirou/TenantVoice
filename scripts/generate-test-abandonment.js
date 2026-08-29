// Script to generate displacement test data with new subcategories
import { db } from '../server/db.js';
import { issues, buildings } from '../shared/schema.js';
import { computeEmbedding } from '../server/vector.js';

async function generateTestAbandonmentData() {
  try {
    console.log("Generating test abandonment data...");
    
    // First, get some existing buildings
    const buildingResults = await db.select().from(buildings).limit(5);
    
    if (buildingResults.length === 0) {
      console.error("No buildings found. Please run the main seed script first.");
      return;
    }
    
    // Create test displacement issues with the new subcategories
    const testIssues = [
      {
        category: "displacement",
        subIssues: ["identity_theft", "lack_of_funds"],
        description: "Tenant reported identity theft leading to financial problems and eventual displacement.",
        status: "open"
      },
      {
        category: "displacement",
        subIssues: ["lack_of_funds", "harassment"],
        description: "Tenant faced both harassment and financial issues forcing them to leave the building.",
        status: "in progress"
      },
      {
        category: "displacement",
        subIssues: ["harassment", "lack_of_work"],
        description: "Tenant experienced workplace discrimination and harassment in the building.",
        status: "open"
      },
      {
        category: "displacement",
        subIssues: ["lack_of_work", "identity_theft"],
        description: "Tenant lost their job and also experienced identity theft, forcing them to move out.",
        status: "resolved"
      },
      {
        category: "displacement",
        subIssues: ["identity_theft", "other_displacement"],
        description: "Tenant had their identity stolen and also faced other challenges related to family circumstances.",
        status: "open"
      }
    ];
    
    for (let i = 0; i < testIssues.length; i++) {
      const issue = testIssues[i];
      const buildingId = buildingResults[i % buildingResults.length].id;
      
      // Create vector embedding for search
      const textForEmbedding = `${issue.category} ${issue.subIssues.join(' ')} ${issue.description}`;
      const vector = await computeEmbedding(textForEmbedding);
      
      // Insert the issue
      await db.insert(issues).values({
        buildingId,
        category: issue.category,
        subIssues: issue.subIssues,
        description: issue.description,
        date: new Date(),
        status: issue.status,
        resolution: issue.status === "resolved" ? "Issue has been addressed and tenant provided assistance." : null,
        contactInfo: "test@example.com",
        vector
      });
      
      console.log(`Created test issue ${i+1} with subcategories: ${issue.subIssues.join(', ')}`);
    }
    
    console.log("Test abandonment data generated successfully!");
  } catch (error) {
    console.error("Error generating test data:", error);
  }
}

// Run the function 
generateTestAbandonmentData()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch(error => {
    console.error("Error:", error);
    process.exit(1);
  });