# Legixo Thinklabs Full Stack Intern Assignment

This is a production-aware mini module for legal operations where users can manage case intake records, hearing preparation tasks, and view a dashboard summarizing hearing readiness.

## Features
- **Dashboard**: High-level overview of total cases, upcoming hearings, and task completion metrics.
- **Case Management**: Full CRUD operations for legal cases with robust search, filtering, and stage tracking.
- **Task Tracker**: Manage tasks associated with cases, including a 1-click completion toggle utilizing a GraphQL mutation.
- **Role Simulation**: Switch between 'Admin' and 'Intern' roles to see conditional UI rendering and backend permission enforcement.

## Technology Stack
- **Frontend**: React, Vite, TailwindCSS, React Query, React Router, GraphQL Request, React Hook Form + Zod.
- **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose), GraphQL, Zod.

## Getting Started

### Prerequisites
- Node.js (v18+)
- (Optional) MongoDB (if you wish to use a persistent database instead of the built-in memory server)

### Backend Setup
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. The server runs out of the box without any `.env` configuration thanks to `mongodb-memory-server`.
4. Run the development server: `npm run dev`

### Frontend Setup
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Run the Vite development server: `npm run dev`
4. Access the app at `http://localhost:5173`

## Environment Variables
The application supports the following environment variables if you wish to override the defaults. 
If no `.env` is provided, the app will run beautifully with sensible fallbacks!

**Backend (`backend/.env`):**
- `PORT`: The port for the Express server (Defaults to `5000`)
- `MONGO_URI`: A custom MongoDB connection string (Defaults to `mongodb://localhost:27017/legixo_case`, which triggers the in-memory `mongodb-memory-server` instead for zero-config testing!)

**Frontend (`frontend/.env`):**
- `VITE_API_URL`: The base URL for the REST and GraphQL APIs (Defaults to `http://localhost:5000/api` and `http://localhost:5000/graphql`)

## Assumptions and Limitations
- **Database Persistence**: To ensure a frictionless review process, the backend uses `mongodb-memory-server` by default. This means the database is wiped clean every time the server restarts. A seeder script automatically populates 4 dummy cases on boot.
- **Authentication Simulation**: Role-based access control (Admin vs Intern) is simulated using a dropdown in the UI and a custom `x-user-role` header rather than full JWT authentication.
- **GraphQL Scope**: GraphQL is currently implemented strictly for the Dashboard summary and Task toggle mutation to demonstrate proficiency without over-engineering the standard CRUD operations, which remain in REST.

## Architecture Notes & Trade-offs
- The backend strictly follows the `Controller -> Service -> Model` pattern for clean separation of concerns.
- We utilize Zod for identical validation schemas on both the frontend and backend.
- Trade-off: Mixing REST and GraphQL in the same API layer is an intentional design choice for this assignment to demonstrate mastery of both paradigms, though a real-world application would likely standardise on one.

## Testing
- **Backend**: `npm test` (Runs Jest suite)
- **Frontend**: `npm test` (Runs Vitest suite)
