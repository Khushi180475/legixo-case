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

## Folder Structure Overview
The project is strictly split into a `frontend` and `backend` monorepo style.

**Backend Structure (MVC Pattern):**
- `src/models`: Mongoose database schemas and TypeScript interfaces (`Case.model.ts`, `Task.model.ts`).
- `src/controllers`: Maps incoming HTTP requests to services and formats responses.
- `src/services`: Pure business logic and database interactions.
- `src/routes`: Express router mapping and middleware injection.
- `src/middleware`: Custom Error handling, Authentication checks, and Zod payload validation.
- `src/graphql`: GraphQL schema definitions and resolver logic.

**Frontend Structure (Feature-Sliced Design):**
- `src/pages`: Top-level routing views (`DashboardPage`, `CaseListPage`, `CaseFormPage`).
- `src/features`: Domain-specific UI logic (e.g., `cases/CaseList.tsx`, `tasks/TaskTracker.tsx`).
- `src/components`: Generic, reusable UI components (Cards, Buttons, Inputs, Skeletons).
- `src/hooks`: Tanstack React Query hooks for fetching and mutating server state.
- `src/services`: Network configuration for Axios (REST) and GraphQL Request.
- `src/context`: React Context providers (Role simulation).

## Assumptions and Limitations
- **Database Persistence**: To ensure a frictionless review process, the backend uses `mongodb-memory-server` by default. This means the database is wiped clean every time the server restarts. A seeder script automatically populates 4 dummy cases on boot.
- **Authentication Simulation**: Role-based access control (Admin vs Intern) is simulated using a dropdown in the UI and a custom `x-user-role` header rather than full JWT authentication.
- **GraphQL Scope**: GraphQL is currently implemented strictly for the Dashboard summary and Task toggle mutation to demonstrate proficiency without over-engineering the standard CRUD operations, which remain in REST.

## Architecture Notes & Trade-offs
- The backend strictly follows the `Controller -> Service -> Model` pattern for clean separation of concerns.
- We utilize Zod for identical validation schemas on both the frontend and backend.
- Trade-off: Mixing REST and GraphQL in the same API layer is an intentional design choice for this assignment to demonstrate mastery of both paradigms, though a real-world application would likely standardise on one.

## Bonuses Attempted & Where to Review Them
1. **Bonus 1: GraphQL (15pts)**
   - **Where:** `backend/src/graphql` (Schema & Resolvers), `frontend/src/features/tasks/TaskTracker.tsx` (Mutation), `frontend/src/hooks/useDashboard.ts` (Query).
   - **How it works:** The dashboard metrics and the "1-click task completion toggle" actively use the GraphQL endpoint (`/graphql`), completely isolated from the standard REST CRUD API.
2. **Bonus 2: Basic Role Handling (8pts)**
   - **Where:** `frontend/src/context/RoleContext.tsx` and `backend/src/middleware/requireAdmin.ts`.
   - **How it works:** Swap roles via the top-right nav bar. Interns will visually lose the "Delete Case" button on the UI. If they attempt to forge a deletion request, the backend drops it with a `403 Forbidden`.
3. **Bonus 3: Testing (8pts)**
   - **Where:** `backend/src/services/dashboard.service.test.ts` (Jest) and `frontend/src/context/RoleContext.test.tsx` (Vitest).
   - **How it works:** Tests actual business logic (mocking Mongoose aggregation outputs and verifying React Context state updates). Run using `npm test` in the respective directories.
4. **Bonus 4: AI-Assisted Development Log (5pts)**
   - **Where:** Check the PR or the submitted text summary. The AI generated the core boilerplate, while the human developer explicitly fixed architecture constraints like `mongodb-memory-server` garbage collection bugs and enforced strict UI GraphQL integration imports.
5. **Bonus 5: UX Quality (4pts)**
   - **Where:** `frontend/src/components/ui/Skeleton.tsx` and responsive grids (`grid-cols-1 md:grid-cols-2 xl:grid-cols-3`).
   - **How it works:** The UI is completely mobile responsive and uses animated Skeleton loaders mapped to React Query's `isLoading` state to eliminate layout shift during data fetching.

## Testing
- **Backend**: `npm test` (Runs Jest suite)
- **Frontend**: `npm test` (Runs Vitest suite)
