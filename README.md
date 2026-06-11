# lmsv2 (Learning Management System)

A modern, full-stack Learning Management System (LMS) built with Next.js App Router, Prisma, PostgreSQL, and Tailwind CSS.

## Features

- **Role-Based Access Control**: Supports distinct roles for `STUDENT`, `INSTRUCTOR`, and `ADMIN`.
- **Course Management**: Instructors can create, edit, and publish courses.
- **Student Dashboard**: Track enrollments, course progress, and upcoming deadlines.
- **Learning Streaks**: Gamification features to track daily learning streaks.
- **Quizzes & Assessments**: Evaluate student knowledge with integrated quizzes.
- **Authentication**: Secure, custom authentication implemented with `bcryptjs` and `jose` (JWT).

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: Custom JWT-based auth (`jose`, `bcryptjs`)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Set up your environment variables:
Create a `.env` file in the root directory and add your database and authentication secrets.
```env
DATABASE_URL="postgresql://user:password@localhost:5432/lmsv2"
DIRECT_URL="postgresql://user:password@localhost:5432/lmsv2"
# Add your JWT secret and other required variables here
```

3. Initialize the database with Prisma:
```bash
npx prisma db push
# Optional: Seed the database with initial data
npx prisma db seed
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/app`: Next.js App Router pages and layouts (`/admin`, `/student`, etc.)
- `/src/app/actions`: Server Actions for data mutation and authentication
- `/prisma`: Prisma schema and database migration/seeding logic
- `/src/middleware.js`: Edge middleware for protecting routes and handling auth sessions

## License

This project is private.
