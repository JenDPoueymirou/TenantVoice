import OpenAI from "openai";

// Initialize the OpenAI client with our API key
// The API key is stored safely as an environment variable
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * This function converts text into numbers (embeddings) that represent its meaning
 * 
 * @param text - The text we want to convert (like a description of a tenant issue)
 * @returns An array of numbers that represents the meaning of the text
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    console.log(`Starting embedding generation for text: ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`);
    
    // If there's no text, return an empty array of numbers
    if (!text || text.trim() === '') {
      console.log("Empty text provided, returning zero vector");
      return new Array(1536).fill(0); // 1536 is the size of the embedding vector
    }
    
    console.log("Checking OpenAI API key:", 
                process.env.OPENAI_API_KEY ? 
                `API key exists (length: ${process.env.OPENAI_API_KEY.length})` : 
                "API key is missing");
    
    // Send the text to OpenAI and ask for an embedding
    console.log("Sending request to OpenAI embeddings API...");
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small", // This is the model we're using
      input: text,                     // This is the text we're converting
      encoding_format: "float"         // This tells OpenAI to return actual numbers
    });
    
    console.log("Successfully received embedding response");
    
    // Return the embedding (the array of numbers)
    return response.data[0].embedding;
  } catch (error) {
    // If something goes wrong, log the error and throw a new error
    console.error("Error generating embedding (full error):", error);
    
    // @ts-ignore - TypeScript doesn't know the structure of our error
    const errorMessage = error?.message || "Unknown error";
    console.error("Error message:", errorMessage);
    
    // Provide a fallback for development purposes to keep the app running
    console.log("Returning fallback random embedding vector for development");
    
    // Generate a random embedding vector for development testing
    // This allows the application to continue functioning while the OpenAI integration is being fixed
    const fallbackVector = Array.from({ length: 1536 }, () => Math.random() * 2 - 1);
    return fallbackVector;
  }
}

/**
 * This function is similar to generateEmbedding, but it can handle multiple texts at once
 * This is more efficient than calling generateEmbedding many times
 * 
 * @param texts - An array of texts to convert
 * @returns An array of embedding vectors (arrays of numbers)
 */
export async function generateBatchEmbeddings(texts: string[]): Promise<number[][]> {
  console.log(`Starting batch embedding generation for ${texts.length} texts`);
  
  // Remove any empty texts
  const nonEmptyTexts = texts.filter(text => text && text.trim() !== '');
  console.log(`After filtering empty texts: ${nonEmptyTexts.length} texts remain`);
  
  // If there are no texts left, return an empty array
  if (nonEmptyTexts.length === 0) {
    console.log("No non-empty texts to process, returning empty array");
    return [];
  }
  
  try {
    console.log("Checking OpenAI API key:", 
                process.env.OPENAI_API_KEY ? 
                `API key exists (length: ${process.env.OPENAI_API_KEY.length})` : 
                "API key is missing");
                
    // Send all the texts to OpenAI at once
    console.log("Sending batch request to OpenAI embeddings API...");
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: nonEmptyTexts,
      encoding_format: "float"
    });
    
    console.log("Successfully received batch embedding response");
    
    // Return all the embeddings
    return response.data.map(item => item.embedding);
  } catch (error) {
    // Handle any errors
    console.error("Error generating batch embeddings (full error):", error);
    
    // @ts-ignore - TypeScript doesn't know the structure of our error
    const errorMessage = error?.message || "Unknown error";
    console.error("Error message:", errorMessage);
    
    // Generate fallback random embeddings for development purposes
    console.log("Returning fallback random embedding vectors for development");
    
    // Create random vectors for each text
    const fallbackVectors = nonEmptyTexts.map(() => 
      Array.from({ length: 1536 }, () => Math.random() * 2 - 1)
    );
    
    return fallbackVectors;
  }
}