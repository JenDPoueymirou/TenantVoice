// This is a temporary file we'll use to help create the replacement for the searchIssues function

async searchIssues(query: string, limit = 10): Promise<Issue[]> {
  try {
    // Get all issues first
    const allIssues = await db.select().from(issues);
    
    // If we have no issues, return an empty array
    if (!allIssues || allIssues.length === 0) {
      console.log("No issues found in database for search");
      return [];
    }
    
    // First try direct category matching - very fast and reliable
    const categoryQuery = query.toLowerCase().trim();
    if (categoryQuery) {
      const directMatches = allIssues.filter(issue => 
        issue.category.toLowerCase().includes(categoryQuery) ||
        (issue.subIssues && issue.subIssues.some(sub => 
          sub.toLowerCase().includes(categoryQuery)
        ))
      );
      
      // If we have direct matches, return them
      if (directMatches.length > 0) {
        console.log(`Found ${directMatches.length} direct category matches for: ${categoryQuery}`);
        return directMatches.slice(0, limit);
      }
    }
    
    // If no direct matches, try the vector search
    try {
      // Check if we have any issues with vectors
      const hasVectorData = allIssues.some(issue => issue.vector && issue.vector.length > 0);
      
      // If no vector data exists, use text search instead
      if (!hasVectorData) {
        console.log("No vector data found, using text search instead");
        return this.textBasedSearch(query, allIssues, limit);
      }
      
      // Generate embedding for the query
      const queryVector = await computeEmbedding(query);
      
      // PART 1: Search by issues directly
      const issuesWithScore = allIssues.map(issue => {
        if (!issue.vector) return { issue, score: 0 };
        
        // Calculate cosine similarity
        const similarity = this.cosineSimilarity(queryVector, issue.vector);
        return { issue, score: similarity };
      });
      
      // PART 2: Search by buildings and include their issues
      const allBuildings = await db.select().from(buildings);
      
      // Calculate building similarity scores
      const buildingSimilarityMap = new Map<number, number>();
      
      for (const building of allBuildings) {
        if (!building.vector) continue;
        
        const similarity = this.cosineSimilarity(queryVector, building.vector);
        buildingSimilarityMap.set(building.id, similarity);
      }
      
      // Boost issues based on their building's relevance
      const combinedScores = issuesWithScore.map(item => {
        // Get the building relevance score if available
        const buildingScore = buildingSimilarityMap.get(item.issue.buildingId) || 0;
        
        // Combined score: 70% issue relevance, 30% building relevance
        const combinedScore = (0.7 * item.score) + (0.3 * buildingScore);
        
        return {
          issue: item.issue,
          score: combinedScore
        };
      });
      
      // Sort by combined score and get the top results
      return combinedScores
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.issue);
    } catch (vectorError) {
      console.error("Vector search failed, using text search instead:", vectorError);
      return this.textBasedSearch(query, allIssues, limit);
    }
  } catch (error) {
    console.error("Error in searchIssues, using text search as fallback:", error);
    
    try {
      // Attempt to get issues again for text search fallback
      const fallbackIssues = await db.select().from(issues);
      return this.textBasedSearch(query, fallbackIssues, limit);
    } catch (fallbackError) {
      console.error("Critical error in searchIssues fallback:", fallbackError);
      return []; // Return empty array in case of total failure
    }
  }
}