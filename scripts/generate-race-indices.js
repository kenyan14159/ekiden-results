const fs = require('fs');
const path = require('path');

// Map race IDs to their data directories
// Based on data directory structure
const RACE_DATA_MAP = {
  // University
  'hakone': 'university/hakone',
  'izumo': 'university/izumo',
  'zenjitsu': 'university/all-japan',
  'morinomiyako': 'university/morinomiyako',
  'fujisan': 'university/fujisan',
  'mixed-gender': 'university/mixed-gender', // Check if exists
  
  // Corporate
  'newyear': 'corporate/newyear',
  'queens': 'corporate/queens',
  
  // High School
  'miyakooji-men': 'highschool/boys',
  'miyakooji-women': 'highschool/girls',
  
  // Junior High
  'junior-high-men': 'junior-high/boys',
  'junior-high-women': 'junior-high/girls',
  
  // Prefectures (Other)
  'hiroshima': 'prefectures/boys',
  'prefecture-women': 'prefectures/girls'
};

const DATA_ROOT = path.join(__dirname, '../data');
const OUTPUT_DIR = path.join(__dirname, '../data/indices');

// Create output directory if not exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateIndices() {
  console.log('Generating race indices...');

  for (const [raceId, relativeDir] of Object.entries(RACE_DATA_MAP)) {
    const dirPath = path.join(DATA_ROOT, relativeDir);
    
    if (!fs.existsSync(dirPath)) {
      console.warn(`Warning: Directory not found for ${raceId}: ${dirPath}`);
      continue;
    }

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json'));
    const indexData = [];

    for (const file of files) {
      const year = parseInt(file.replace('.json', ''));
      if (isNaN(year)) continue;

      try {
        const content = fs.readFileSync(path.join(dirPath, file), 'utf8');
        const data = JSON.parse(content);
        
        // Extract summary data
        // We need: year, count (optional), top 3 teams (names and times)
        
        let topTeams = [];
        if (data.teams && Array.isArray(data.teams)) {
             topTeams = data.teams
            .filter(t => typeof t.rank === 'number' || !isNaN(parseInt(t.rank)))
            .sort((a, b) => {
                const rankA = typeof a.rank === 'number' ? a.rank : parseInt(a.rank);
                const rankB = typeof b.rank === 'number' ? b.rank : parseInt(b.rank);
                return rankA - rankB;
            })
            .slice(0, 3)
            .map(t => ({
              name: t.name,
              totalTime: t.totalTime
            }));
        }

        indexData.push({
          year,
          teams: topTeams.map(t => t.name),
          times: topTeams.map(t => t.totalTime),
          count: data.teams ? data.teams.length : 0
        });

      } catch (err) {
        console.error(`Error processing ${raceId}/${file}:`, err.message);
      }
    }

    // Sort by year descending
    indexData.sort((a, b) => b.year - a.year);

    // Write index file
    const outputPath = path.join(OUTPUT_DIR, `${raceId}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(indexData, null, 2));
    console.log(`Generated index for ${raceId}: ${indexData.length} years`);
  }
}

generateIndices();

