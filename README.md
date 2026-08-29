# Goldmont Tenant Issues Platform - Project Overview

## Project Purpose
This platform documents and visualizes tenant issues with Goldmont properties. It provides a comprehensive system for collecting, storing, analyzing, and visualizing data about tenant complaints regarding their rental properties owned by Goldmont Realty Corp.

## Current State
- Built with React frontend and Express backend
- Uses PostgreSQL database for persistent data storage
- Includes dashboards for data visualization
- Tracks multiple categories of tenant issues
- Allows for detailed issue reporting through multi-step forms
- Repository linked to GitHub at https://github.com/jenpouey/LandlordLedger

## Core Features
1. **Issue Reporting System**: Multi-step forms for tenants to report various types of landlord issues
2. **Issue Categories**:
   - Harassment
   - Repairs needed
   - Rental agreement problems
   - Digital/tech attacks
   - Financial attacks
   - Tenant displacement attempts

3. **Data Visualization**: Dashboard with charts and statistics to show patterns in reported issues
4. **Building Profiles**: Tracking issues by property location
5. **Search Functionality**: Vector-based search to find similar complaints
6. **Data Export**: Ability to export graphs, statistics for advocacy purposes

## Technical Implementation
- **Frontend**: React with shadcn UI components, Tailwind CSS
- **Backend**: Express.js server
- **Database**: PostgreSQL (migrated from in-memory storage)
- **ORM**: Drizzle for type-safe database operations
- **Query Management**: TanStack Query (React Query)
- **Vector Search**: Implementation for similarity-based issue search
- **Form Handling**: React Hook Form with Zod validation

## Project Structure
- `/client`: Frontend React application
- `/server`: Backend Express APIs
- `/shared`: Shared code between frontend and backend (schema definitions)
- `/migrations`: Database migration files

## Database Structure
The database contains tables for:
- `users`: User accounts for accessing the platform
- `buildings`: Property details including address and landlord information
- `issues`: Tenant complaints with categories, descriptions, and vector embeddings

## Recent Changes
- Implemented PostgreSQL database storage to replace in-memory storage
- Created DatabaseStorage class with CRUD methods for all entities
- Added vector similarity search for finding related issues
- Set up GitHub integration for version control

## Next Steps
- Add more data visualizations for trend analysis
- Enhance export functionality for reports
- Implement user authentication for tenant accounts
- Add admin interface for managing reported issues
- Scale to handle Goldmont's 3,000+ units across 200+ properties

## How to Resume Work
When resuming work tomorrow, simply remind the system about "the Goldmont tenant issues tracking platform" or "LandlordLedger project" and refer to this PROJECT_OVERVIEW.md file for context. The specific GitHub repository is at https://github.com/jenpouey/LandlordLedger.
