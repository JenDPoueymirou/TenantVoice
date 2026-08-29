import { db } from "../server/db";
import { buildings, issues, issueCategories, subIssuesByCategory } from "../shared/schema";
import { computeEmbedding } from "../server/vector";
import { eq } from "drizzle-orm";

// NYC streets for sample data
const nycStreets = [
  "Broadway", "Park Avenue", "5th Avenue", "Madison Avenue", "Lexington Avenue",
  "3rd Avenue", "2nd Avenue", "1st Avenue", "Amsterdam Avenue", "Columbus Avenue",
  "West End Avenue", "Riverside Drive", "Central Park West", "Morningside Drive",
  "St. Nicholas Avenue", "Manhattan Avenue", "Frederick Douglass Boulevard",
  "Adam Clayton Powell Jr Boulevard", "Lenox Avenue", "Malcolm X Boulevard",
  "West Street", "Church Street", "Greenwich Street", "Hudson Street", "Varick Street",
  "Canal Street", "Delancey Street", "Grand Street", "Houston Street", "Spring Street",
  "Bleecker Street", "Christopher Street", "14th Street", "23rd Street", "34th Street",
  "42nd Street", "57th Street", "72nd Street", "79th Street", "86th Street",
  "96th Street", "110th Street", "125th Street", "135th Street", "145th Street"
];

// NYC neighborhoods
const nycNeighborhoods = [
  "Manhattan Valley", "Upper West Side", "Upper East Side", "Harlem", "East Harlem",
  "Washington Heights", "Inwood", "Chelsea", "Hell's Kitchen", "Midtown",
  "Murray Hill", "Gramercy", "Greenwich Village", "SoHo", "Tribeca",
  "Financial District", "Lower East Side", "East Village", "Chinatown", "Little Italy"
];

// Issue descriptions for each category
const issueDescriptions = {
  repairs: [
    "No heat in the apartment for the past 3 days.",
    "Hot water not working for over a week.",
    "Major leak in the kitchen ceiling.",
    "Bathroom plumbing backing up regularly.",
    "Electrical outlets not working in the living room.",
    "Severe rodent infestation throughout the apartment.",
    "Cracked and deteriorating walls in the bedroom.",
    "Refrigerator stopped working last month.",
    "Broken window that lets in cold air and rain.",
    "Mold growing in the bathroom due to ventilation issues.",
    "Front door lock is broken, creating a security risk.",
    "Elevator has been out of service for two weeks.",
    "Hallway lights are not working, creating unsafe conditions.",
    "Severe cockroach infestation in the kitchen.",
    "Bathroom ceiling collapsed due to water damage."
  ],
  harassment: [
    "Landlord enters apartment without notice or permission.",
    "Received threatening calls demanding I move out.",
    "Landlord shut off water without notice as intimidation.",
    "Building staff verbally intimidates tenants who complain.",
    "Repeatedly being told I'll be evicted for minor issues.",
    "Landlord has installed cameras facing my door.",
    "Maintenance requests are ignored as a form of harassment.",
    "Received threatening letters to vacate without legal cause.",
    "Construction work deliberately scheduled at unreasonable hours.",
    "Landlord threatens to call immigration when I request repairs.",
    "Other tenants who complained have had their utilities cut off.",
    "Landlord has started removing amenities to force tenants out.",
    "Property manager makes discriminatory comments regularly.",
    "Repeated loud construction with no actual work being done.",
    "Door locks were changed without providing new keys."
  ],
  rental_agreements: [
    "Rent was increased by 20% without proper notice.",
    "Security deposit not returned after moving out.",
    "Lease terms changed without my consent or notification.",
    "Charged for utilities that should be included per lease.",
    "Landlord refusing to renew lease without explanation.",
    "Added new rules not in the original lease agreement.",
    "Being charged fees not specified in the lease.",
    "Landlord trying to enforce illegal lease terms.",
    "Rent-stabilized apartment being treated as market-rate.",
    "Threatened with eviction despite being current on rent.",
    "Lease renewal offered with unreasonable new conditions.",
    "Landlord failed to provide legally required lease riders.",
    "Attempted to change payment methods without proper notice.",
    "Charged late fees despite paying rent on time with proof.",
    "Landlord refuses to provide rent receipts."
  ],
  financial: [
    "Unexplained charges added to my monthly rent statement.",
    "Rent payment not credited to my account despite proof of payment.",
    "Being charged late fees when payment was made on time.",
    "Landlord attempting to collect fees not in the lease.",
    "Security deposit used for normal wear and tear repairs.",
    "Rent increases exceed legal limits for rent-stabilized unit.",
    "Previous months' payments suddenly showing as unpaid.",
    "Required to use payment system that charges excessive fees.",
    "Double-billing for the same maintenance repairs.",
    "Landlord won't accept rent payment, then claims it's late.",
    "Charged for building-wide repairs that are landlord's responsibility.",
    "Rent history shows possible illegal deregulation.",
    "Receipts and actual charges don't match each other.",
    "Attempts to collect rent during legal rent strike.",
    "Apartment is receiving preferential rent but being charged market rate."
  ],
  digital: [
    "Tenant portal frequently down when rent is due.",
    "Online payment system charges excessive fees.",
    "Building's promised WiFi service is unreliable/non-existent.",
    "Required to use app that collects excessive personal data.",
    "Digital communications about building issues are ignored.",
    "Online complaint system never processes submissions.",
    "Negative online reviews about property are removed.",
    "Management sends misleading digital notices about services.",
    "Apartment advertised with amenities online that don't exist.",
    "Receiving spam emails after using landlord's portal.",
    "Building app shows incorrect payment history.",
    "Digital threats or harassment through management platforms.",
    "Payment website has security issues exposing tenant data.",
    "Digital notices for maintenance never result in actual service.",
    "Required to communicate only through proprietary app that doesn't work."
  ],
  displacement: [
    "Constant construction making apartment uninhabitable.",
    "Essential services like water/heat repeatedly shut off.",
    "Landlord openly discusses plans to convert to luxury units.",
    "Buyout offers accompanied by threats if not accepted.",
    "Majority of long-term tenants have been forced out already.",
    "Construction debris and hazardous materials in common areas.",
    "Landlord refuses to address dangerous living conditions.",
    "Told that building is being converted to commercial use.",
    "Construction work damages personal property with no compensation.",
    "Repeated filing of frivolous eviction cases.",
    "Landlord refuses to cash rent checks, then claims non-payment.",
    "Building being emptied for alleged 'renovations'.",
    "Safety violations intentionally created to vacate building.",
    "Neighboring units left vacant and unsecured leading to break-ins.",
    "Demolition work started while tenants still occupy the building."
  ]
};

// Status options
const statuses = ["open", "in progress", "resolved"];

// Date generator (random dates from past 2 years)
function randomDate() {
  const start = new Date();
  start.setFullYear(start.getFullYear() - 2);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Generate a random street number
function randomStreetNumber() {
  return Math.floor(Math.random() * 900) + 100;
}

// Generate a random apartment/unit number
function randomUnit() {
  const floor = Math.floor(Math.random() * 20) + 1;
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 8)); // A through H
  return `${floor}${letter}`;
}

// Generate random zipcode for NYC
function randomZipcode() {
  // NYC zip codes range approximately from 10001 to 11697
  const zips = ["10001", "10002", "10003", "10009", "10010", "10011", "10012", 
                "10013", "10014", "10016", "10017", "10018", "10019", "10021", 
                "10023", "10024", "10025", "10028", "10029", "10030", "10031", 
                "10032", "10033", "10034", "10035", "10036", "10037", "10038", 
                "10039", "10040", "10128"];
  return zips[Math.floor(Math.random() * zips.length)];
}

// Generate random subcategories for a given category
function randomSubIssues(category: string) {
  const availableSubIssues = subIssuesByCategory[category as keyof typeof subIssuesByCategory];
  const numToSelect = Math.floor(Math.random() * 3) + 1; // 1 to 3 subcategories
  const selectedSubIssues: string[] = [];
  
  for (let i = 0; i < numToSelect; i++) {
    const randomIndex = Math.floor(Math.random() * availableSubIssues.length);
    if (!selectedSubIssues.includes(availableSubIssues[randomIndex])) {
      selectedSubIssues.push(availableSubIssues[randomIndex]);
    }
  }
  
  return selectedSubIssues;
}

// Generate random status with weighted distribution
// 60% open, 30% in progress, 10% resolved
function randomStatus() {
  const rand = Math.random();
  if (rand < 0.6) return "open";
  if (rand < 0.9) return "in progress";
  return "resolved";
}

async function seedDatabase() {
  console.log("Starting database seeding...");
  
  // Track building IDs for creating issues
  const buildingIds: number[] = [];
  
  // Create buildings (200)
  console.log("Creating buildings...");
  
  for (let i = 0; i < 200; i++) {
    const streetName = nycStreets[Math.floor(Math.random() * nycStreets.length)];
    const streetNumber = randomStreetNumber();
    const address = `${streetNumber} ${streetName}`;
    const unit = Math.random() > 0.3 ? randomUnit() : null; // 70% have units
    const neighborhood = nycNeighborhoods[Math.floor(Math.random() * nycNeighborhoods.length)];
    const state = "NY";
    const zipCode = randomZipcode();
    
    // Create vector embedding for building address
    const addressText = `${address} ${unit || ''} ${neighborhood} ${state} ${zipCode} Goldmont Properties`;
    const vector = await computeEmbedding(addressText);
    
    try {
      const [building] = await db.insert(buildings).values({
        address,
        unit,
        city: "New York",
        state,
        zipCode,
        landlord: "Goldmont Properties",
        vector
      }).returning();
      
      buildingIds.push(building.id);
      
      if (i % 20 === 0) {
        console.log(`Created ${i} buildings...`);
      }
    } catch (error) {
      console.error(`Error creating building ${address}:`, error);
    }
  }
  
  console.log(`Created ${buildingIds.length} buildings successfully`);
  
  // Create issues (500)
  console.log("Creating issues...");
  let issueCount = 0;
  
  // Create more issues for buildings with lower IDs (simulate problem buildings)
  for (let i = 0; i < 500; i++) {
    // Weight it so that earlier buildings have more issues
    let buildingIndex: number;
    const rand = Math.random();
    
    if (rand < 0.4) {
      // 40% chance to pick from the first quarter of buildings
      buildingIndex = Math.floor(Math.random() * (buildingIds.length / 4));
    } else if (rand < 0.7) {
      // 30% chance to pick from the second quarter of buildings
      buildingIndex = Math.floor((buildingIds.length / 4) + Math.random() * (buildingIds.length / 4));
    } else {
      // 30% chance to pick from the rest of the buildings
      buildingIndex = Math.floor((buildingIds.length / 2) + Math.random() * (buildingIds.length / 2));
    }
    
    const buildingId = buildingIds[buildingIndex];
    const category = issueCategories[Math.floor(Math.random() * issueCategories.length)];
    const subIssues = randomSubIssues(category);
    
    // Get building info to enhance the vector with location data
    const [buildingInfo] = await db.select().from(buildings).where(eq(buildings.id, buildingId));
    
    // Select a description from the appropriate category
    const descriptions = issueDescriptions[category as keyof typeof issueDescriptions];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    // Generate a random date within the last 2 years
    const date = randomDate();
    
    // Generate a random status
    const status = randomStatus();
    
    // Optional resolution text for resolved issues
    const resolution = status === "resolved" ? "Issue has been fixed to tenant's satisfaction." : null;
    
    // Optional contact info (50% chance)
    const contactInfo = Math.random() > 0.5 ? "tenant@example.com" : null;
    
    // Create vector embedding from issue + building info
    let textForEmbedding = `${category} ${subIssues.join(' ')} ${description}`;
    
    // Add building information
    if (buildingInfo) {
      textForEmbedding += ` ${buildingInfo.address} ${buildingInfo.unit || ''} ${buildingInfo.city} ${buildingInfo.state} ${buildingInfo.zipCode} ${buildingInfo.landlord}`;
    }
    
    const vector = await computeEmbedding(textForEmbedding);
    
    try {
      await db.insert(issues).values({
        buildingId,
        category,
        subIssues,
        description,
        date,
        status,
        resolution,
        contactInfo,
        vector
      });
      
      issueCount++;
      
      if (i % 50 === 0) {
        console.log(`Created ${i} issues...`);
      }
    } catch (error) {
      console.error(`Error creating issue for building ${buildingId}:`, error);
    }
  }
  
  console.log(`Created ${issueCount} issues successfully`);
  console.log("Database seeding complete!");
}

// Export the seeding function
export { seedDatabase };

// If running this file directly, execute the seeding
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("Seeding completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error during seeding:", error);
      process.exit(1);
    });
}