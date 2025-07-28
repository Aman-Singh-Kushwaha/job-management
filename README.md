# Job Management Board

This is a full-stack job management board application built with a modern tech stack, featuring a Next.js frontend and a NestJS backend.

#### Live
frontend: https://job-management-admin-phi.vercel.app/
backend: https://job-management-gamma.vercel.app/

## Features

- **Job Listings:** View a list of all available jobs.
- **Dynamic Filtering:** Filter jobs in real-time by job title, location, job type, and salary range.
- **Job Creation:** A clean, dialog-based form to create new job postings.
- **Form Validation:** Robust frontend and backend validation for all job creation fields.
- **Debounced Inputs:** Smart filtering that only sends API requests when you're done typing.

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) (React Framework)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/) for styling
  - [shadcn/ui](https://ui.shadcn.com/) for UI components
  - [React Hook Form](https://react-hook-form.com/) for form management
  - [Zod](https://zod.dev/) for validation

- **Backend:**
  - [NestJS](https://nestjs.com/) (Node.js Framework)
  - [TypeScript](https://www.typescriptlang.org/)
  - [TypeORM](https://typeorm.io/) for database interaction
  - [PostgreSQL](https://www.postgresql.org/) database
  - `class-validator` & `class-transformer` for robust DTO validation

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- pnpm (or your preferred package manager)
- A running PostgreSQL database instance

### 1. Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `backend` directory and add your database connection string:
    ```
    DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME
    ```

4.  **Run database migrations (if applicable):**
    *Note: In this project, `synchronize: true` might be enabled for development, which automatically updates the schema. For production, you would use migrations.*

5.  **Start the development server:**
    ```bash
    pnpm run start:dev
    ```
    The backend will be running on `http://localhost:3001`.

### 2. Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Start the development server:**
    ```bash
    pnpm run dev
    ```
    The frontend will be running on `http://localhost:3000`.

## API Endpoints

- `GET /api/jobs`: Fetches all jobs with optional query parameters for filtering.
  - **Query Params:** `jobTitle`, `location`, `jobType`, `salaryMin`, `salaryMax`
- `POST /api/jobs`: Creates a new job posting.
