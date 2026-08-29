import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { db } from '../server/db';
import { buildings } from '../shared/schema';
import { computeEmbedding } from '../server/vector';

async function importBuildings() {
  try {
    // Read the CSV file
    const fileContent = fs.readFileSync('./goldmont_properties_full.csv', 'utf-8');
    
    // Parse the CSV content
    const records = parse(fileContent, {
      delimiter: ',',
      trim: true,
      skip_empty_lines: true,
    });
    
    console.log(`Found ${records.length} buildings to import`);

    // Insert buildings into the database
    for (let i = 0; i < records.length; i++) {
      const [address, lat, lng, borough, zipCode, hpdViolations, openViolations, rating] = records[i];
      
      // Build address string for vector embedding
      const addressText = `${address} ${borough} NY ${zipCode} Goldmont`;
      const vector = await computeEmbedding(addressText);
      
      // Insert building record
      await db.insert(buildings).values({
        address: address.trim(),
        city: borough.trim(),
        state: 'NY',
        zipCode: zipCode.trim(),
        landlord: 'Goldmont',
        
        // Convert coordinates to numbers
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        
        // Additional data
        hpdViolations: parseInt(hpdViolations) || 0,
        openViolations: parseInt(openViolations) || 0,
        rating: parseInt(rating) || 5,
        
        // Add vector embedding
        vector: vector
      }).onConflictDoNothing();
      
      if (i % 10 === 0) {
        console.log(`Imported ${i + 1}/${records.length} buildings`);
      }
    }

    console.log('Buildings import completed successfully');
  } catch (error) {
    console.error('Error importing buildings:', error);
  } finally {
    process.exit(0);
  }
}

importBuildings();