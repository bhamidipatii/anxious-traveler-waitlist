// scripts/convertAirports.js
// Converts OpenFlights airports.dat (CSV) to JSON format

import fs from 'fs';
import readline from 'readline';

async function convertAirportsToJSON() {
  const airports = [];
  
  const fileStream = fs.createReadStream('assets/data/airports.dat');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    // OpenFlights format:
    // 0:Airport ID, 1:Name, 2:City, 3:Country, 4:IATA, 5:ICAO, 6:Latitude, 7:Longitude, etc.
    const parts = line.split(',').map(part => part.replace(/"/g, ''));
    
    const iata = parts[4];
    const icao = parts[5];
    
    // Skip airports without IATA codes (small/private airports)
    if (!iata || iata === '\\N') {
      continue;
    }
    
    airports.push({
      id: parseInt(parts[0]),
      name: parts[1],
      city: parts[2],
      country: parts[3],
      iata: iata,
      icao: icao !== '\\N' ? icao : null,
      latitude: parseFloat(parts[6]),
      longitude: parseFloat(parts[7])
    });
  }

  console.log(`Converted ${airports.length} airports`);
  
  // Save to JSON file
  fs.writeFileSync(
    'assets/data/airports.json',
    JSON.stringify(airports, null, 4)
  );
  
  console.log('✅ Saved to src/data/airports.json');
}

// Run the conversion
convertAirportsToJSON().catch(console.error);