// Simple client-side vector database for full-text search
// For a real implementation, use a proper vector database like Pinecone

// Vector type
export type Vector = number[];

// Document type
export type VectorDocument = {
  id: string;
  vector: Vector;
  metadata: any;
};

// In-memory vector database
export class VectorDB {
  private documents: VectorDocument[] = [];
  private dimension: number;

  constructor(dimension: number = 128) {
    this.dimension = dimension;
  }

  // Add a document to the database
  addDocument(id: string, vector: Vector, metadata: any): void {
    if (vector.length !== this.dimension) {
      throw new Error(`Vector dimension mismatch: expected ${this.dimension}, got ${vector.length}`);
    }
    
    // Check if document already exists
    const existingIndex = this.documents.findIndex(doc => doc.id === id);
    if (existingIndex >= 0) {
      // Update existing document
      this.documents[existingIndex] = { id, vector, metadata };
    } else {
      // Add new document
      this.documents.push({ id, vector, metadata });
    }
  }

  // Remove a document from the database
  removeDocument(id: string): boolean {
    const initialLength = this.documents.length;
    this.documents = this.documents.filter(doc => doc.id !== id);
    return this.documents.length < initialLength;
  }

  // Search for similar documents
  search(queryVector: Vector, limit: number = 10): Array<{ document: VectorDocument, score: number }> {
    if (queryVector.length !== this.dimension) {
      throw new Error(`Query vector dimension mismatch: expected ${this.dimension}, got ${queryVector.length}`);
    }
    
    // Calculate similarity scores
    const results = this.documents.map(document => {
      const score = this.cosineSimilarity(queryVector, document.vector);
      return { document, score };
    });
    
    // Sort by score in descending order and limit results
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  // Calculate cosine similarity between two vectors
  private cosineSimilarity(vecA: Vector, vecB: Vector): number {
    // Calculate dot product
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    
    // Calculate magnitudes
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    
    // Return cosine similarity
    return dotProduct / (magnitudeA * magnitudeB);
  }
}

// Create a simple embedding function for client-side search
export function createEmbedding(text: string): Vector {
  // This is a simplified version that creates "mock" embeddings
  // In a real implementation, you would use an embedding model
  
  const normalizedText = text.toLowerCase().trim();
  
  // Create a vector of size 128
  const vector: Vector = new Array(128).fill(0);
  
  // Fill vector with values derived from the text
  for (let i = 0; i < normalizedText.length; i++) {
    const charCode = normalizedText.charCodeAt(i);
    const position = i % vector.length;
    vector[position] += charCode / 255; // Normalize to 0-1 range
  }
  
  // Normalize the vector to unit length
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  const normalizedVector = vector.map(val => val / (magnitude || 1));
  
  return normalizedVector;
}

// Create a singleton instance for the application
export const vectorDb = new VectorDB(128);
