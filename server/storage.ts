import {
  type Building,
  type InsertBuilding,
  type Issue,
  type InsertIssue,
  buildings,
  issues,
  users,
  type User,
  type InsertUser,
  type IssueCategory
} from "@shared/schema";
import { computeEmbedding } from "./vector";

export interface IStorage {
  // User operations (preserved from original)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Building operations
  getBuildings(): Promise<Building[]>;
  getBuilding(id: number): Promise<Building | undefined>;
  getBuildingsByLandlord(landlord: string): Promise<Building[]>;
  createBuilding(building: InsertBuilding): Promise<Building>;
  
  // Issue operations
  getIssues(): Promise<Issue[]>;
  getIssue(id: number): Promise<Issue | undefined>;
  getIssuesByBuilding(buildingId: number): Promise<Issue[]>;
  getIssuesByCategory(category: IssueCategory): Promise<Issue[]>;
  createIssue(issue: InsertIssue): Promise<Issue>;
  updateIssueStatus(id: number, status: string): Promise<Issue | undefined>;
  
  // Stats operations
  getIssueStats(): Promise<{
    totalIssues: number;
    buildingsAffected: number;
    unresolvedIssues: number;
    resolvedIssues: number;
  }>;
  getIssuesByCategories(): Promise<Record<IssueCategory, number>>;
  getTopBuildingsByIssues(limit: number): Promise<
    Array<{
      building: Building;
      issueCount: number;
      status: string;
      trend: number;
    }>
  >;
  
  // Vector search operation
  searchIssues(query: string, limit?: number): Promise<Issue[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private buildings: Map<number, Building>;
  private issues: Map<number, Issue>;
  private userIdCounter: number;
  private buildingIdCounter: number;
  private issueIdCounter: number;

  constructor() {
    this.users = new Map();
    this.buildings = new Map();
    this.issues = new Map();
    this.userIdCounter = 1;
    this.buildingIdCounter = 1;
    this.issueIdCounter = 1;
    
    // Add some sample data for development
    this.addSampleData();
  }

  // User operations (preserved from original)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Building operations
  async getBuildings(): Promise<Building[]> {
    return Array.from(this.buildings.values());
  }
  
  async getBuilding(id: number): Promise<Building | undefined> {
    return this.buildings.get(id);
  }
  
  async getBuildingsByLandlord(landlord: string): Promise<Building[]> {
    return Array.from(this.buildings.values()).filter(
      building => building.landlord.toLowerCase().includes(landlord.toLowerCase())
    );
  }
  
  async createBuilding(building: InsertBuilding): Promise<Building> {
    const id = this.buildingIdCounter++;
    const newBuilding: Building = { 
      ...building, 
      id, 
      createdAt: new Date() 
    };
    this.buildings.set(id, newBuilding);
    return newBuilding;
  }
  
  // Issue operations
  async getIssues(): Promise<Issue[]> {
    return Array.from(this.issues.values());
  }
  
  async getIssue(id: number): Promise<Issue | undefined> {
    return this.issues.get(id);
  }
  
  async getIssuesByBuilding(buildingId: number): Promise<Issue[]> {
    return Array.from(this.issues.values()).filter(
      issue => issue.buildingId === buildingId
    );
  }
  
  async getIssuesByCategory(category: IssueCategory): Promise<Issue[]> {
    return Array.from(this.issues.values()).filter(
      issue => issue.category === category
    );
  }
  
  async createIssue(issueData: InsertIssue): Promise<Issue> {
    const id = this.issueIdCounter++;
    // Generate vector embedding from description + category + subIssues
    const textForEmbedding = `${issueData.category} ${issueData.subIssues.join(' ')} ${issueData.description}`;
    const vector = await computeEmbedding(textForEmbedding);
    
    const issue: Issue = {
      ...issueData,
      id,
      vector,
      createdAt: new Date(),
    };
    
    this.issues.set(id, issue);
    return issue;
  }
  
  async updateIssueStatus(id: number, status: string): Promise<Issue | undefined> {
    const issue = this.issues.get(id);
    if (!issue) return undefined;
    
    const updatedIssue = { ...issue, status };
    this.issues.set(id, updatedIssue);
    return updatedIssue;
  }
  
  // Stats operations
  async getIssueStats(): Promise<{
    totalIssues: number;
    buildingsAffected: number;
    unresolvedIssues: number;
    resolvedIssues: number;
  }> {
    const allIssues = Array.from(this.issues.values());
    const affectedBuildingIds = new Set(allIssues.map(issue => issue.buildingId));
    
    return {
      totalIssues: allIssues.length,
      buildingsAffected: affectedBuildingIds.size,
      unresolvedIssues: allIssues.filter(issue => issue.status !== 'resolved').length,
      resolvedIssues: allIssues.filter(issue => issue.status === 'resolved').length,
    };
  }
  
  async getIssuesByCategories(): Promise<Record<IssueCategory, number>> {
    const allIssues = Array.from(this.issues.values());
    const categoriesMap: Partial<Record<IssueCategory, number>> = {};
    
    allIssues.forEach(issue => {
      const category = issue.category as IssueCategory;
      categoriesMap[category] = (categoriesMap[category] || 0) + 1;
    });
    
    return categoriesMap as Record<IssueCategory, number>;
  }
  
  async getTopBuildingsByIssues(limit: number): Promise<
    Array<{
      building: Building;
      issueCount: number;
      status: string;
      trend: number;
    }>
  > {
    const allIssues = Array.from(this.issues.values());
    const buildingIssues: Map<number, Issue[]> = new Map();
    
    // Group issues by building
    allIssues.forEach(issue => {
      const buildingId = issue.buildingId;
      const buildingIssuesList = buildingIssues.get(buildingId) || [];
      buildingIssuesList.push(issue);
      buildingIssues.set(buildingId, buildingIssuesList);
    });
    
    // Calculate stats for each building
    const buildingStats = Array.from(buildingIssues.entries()).map(([buildingId, issues]) => {
      const building = this.buildings.get(buildingId);
      if (!building) return null;
      
      const issueCount = issues.length;
      
      // Determine status based on issue count
      let status = 'Low';
      if (issueCount > 30) status = 'Critical';
      else if (issueCount > 20) status = 'High';
      else if (issueCount > 10) status = 'Medium';
      
      // Mock trend (would use historical data in a real implementation)
      // Random value between -10 and 15 for demonstration
      const trend = Math.floor(Math.random() * 25) - 10;
      
      return {
        building,
        issueCount,
        status,
        trend
      };
    }).filter(item => item !== null) as Array<{
      building: Building;
      issueCount: number;
      status: string;
      trend: number;
    }>;
    
    // Sort by issue count in descending order and limit
    return buildingStats
      .sort((a, b) => b.issueCount - a.issueCount)
      .slice(0, limit);
  }
  
  // Vector search implementation
  async searchIssues(query: string, limit = 10): Promise<Issue[]> {
    const queryVector = await computeEmbedding(query);
    const allIssues = Array.from(this.issues.values());
    
    // Calculate cosine similarity for all issues
    const issuesWithScore = allIssues.map(issue => {
      if (!issue.vector) return { issue, score: 0 };
      
      // Calculate cosine similarity
      const similarity = this.cosineSimilarity(queryVector, issue.vector);
      return { issue, score: similarity };
    });
    
    // Sort by similarity score and return top results
    return issuesWithScore
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(result => result.issue);
  }
  
  // Helper method to calculate cosine similarity between two vectors
  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    // Calculate dot product
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    
    // Calculate magnitudes
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    
    // Return cosine similarity
    return dotProduct / (magnitudeA * magnitudeB);
  }
  
  // Add sample data for development purposes
  private addSampleData() {
    // Sample buildings
    const buildings: InsertBuilding[] = [
      {
        address: "123 Main St",
        unit: null,
        city: "New York",
        state: "NY",
        zipCode: "10001",
        landlord: "Goldmont Realty Corp"
      },
      {
        address: "456 Park Ave",
        unit: null,
        city: "New York",
        state: "NY",
        zipCode: "10022",
        landlord: "Goldmont Realty Corp"
      },
      {
        address: "789 Broadway",
        unit: null,
        city: "New York",
        state: "NY",
        zipCode: "10003",
        landlord: "Goldmont Realty Corp"
      },
      {
        address: "101 West End",
        unit: null,
        city: "New York",
        state: "NY",
        zipCode: "10023",
        landlord: "Goldmont Realty Corp"
      },
      {
        address: "220 E 63rd St",
        unit: null,
        city: "New York",
        state: "NY",
        zipCode: "10065",
        landlord: "Goldmont Realty Corp"
      }
    ];
    
    // Add buildings
    buildings.forEach(building => {
      this.createBuilding(building);
    });
  }
}

export const storage = new MemStorage();
