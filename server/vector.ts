// Vector database implementation using OpenAI embeddings
import { generateEmbedding, generateBatchEmbeddings } from './openai';

// Constants
export const VECTOR_DIMENSION = 1536; // Default dimension for text-embedding-3-small

/**
 * Compute an embedding vector for the provided text using OpenAI's API
 * This function wraps the OpenAI embeddings API to generate semantic vectors
 * 
 * @param text - The text to generate embeddings for (can include issue descriptions, addresses, etc.)
 * @returns A vector representation of the text (1536 dimensions by default)
 */
export async function computeEmbedding(text: string): Promise<number[]> {
  if (!text || text.trim() === '') {
    return new Array(VECTOR_DIMENSION).fill(0); // Return zero vector for empty text
  }
  
  try {
    // Use our OpenAI service to generate the embedding
    return await generateEmbedding(text);
  } catch (error: unknown) {
    // Safe error handling
    // @ts-ignore - TypeScript doesn't know the structure of our error
    const errorMessage = error?.message || "Unknown error";
    console.error("Error in computeEmbedding:", errorMessage);
    throw new Error(`Failed to compute embedding: ${errorMessage}`);
  }
}

/**
 * Compute embeddings for multiple texts in a single API call (more efficient)
 * 
 * @param texts - Array of texts to generate embeddings for
 * @returns Array of embedding vectors
 */
export async function computeBatchEmbeddings(texts: string[]): Promise<number[][]> {
  if (!texts || texts.length === 0) {
    return [];
  }
  
  try {
    // Use our batch API to generate multiple embeddings at once
    return await generateBatchEmbeddings(texts);
  } catch (error: unknown) {
    // Safe error handling
    // @ts-ignore - TypeScript doesn't know the structure of our error
    const errorMessage = error?.message || "Unknown error";
    console.error("Error in computeBatchEmbeddings:", errorMessage);
    throw new Error(`Failed to compute batch embeddings: ${errorMessage}`);
  }
}
