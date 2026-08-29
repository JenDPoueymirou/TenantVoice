#!/usr/bin/env node

// This script compiles and runs the TypeScript seeding file

const { execSync } = require('child_process');
const path = require('path');

// First compile the TypeScript file to JavaScript
console.log('Compiling seed-data.ts...');
try {
  execSync('npx tsx scripts/seed-data.ts', { stdio: 'inherit' });
  console.log('Seeding completed successfully!');
} catch (error) {
  console.error('Error running seed script:', error.message);
  process.exit(1);
}