// Simple vector implementation for in-memory vector database
// In a production environment, this would use a proper embedding model

// Function to generate embeddings for text
export async function computeEmbedding(text: string): Promise<number[]> {
  // This is a simplified version that creates "mock" embeddings
  // In a real implementation, you would use an embedding model like OpenAI's
  const normalizedText = text.toLowerCase().trim();
  
  // Create a vector of size 128 (typical embedding might be 1536 dimensions)
  const vector: number[] = new Array(128).fill(0);
  
  // Fill vector with values derived from the text 
  // This is a simple hash-based approach for demonstration
  // In production, you'd use a proper embedding model
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
