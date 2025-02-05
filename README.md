# E-Commerce Platform

This project is a full-stack e-commerce platform with a **backend** and **frontend**. The backend is built using **Node.js**, **Express.js**, **Prisma**, and **JWT** for authentication, while the frontend is built using **React** with **TypeScript** and **Tailwind CSS**.

## Project Structure




## Backend Setup

The backend handles user authentication, data management, and communication with the database.

### Prerequisites

- Node.js (v14.x or later)
- PostgreSQL (or any database you prefer; modify accordingly)

### Installation

Navigate to the `backend` folder:
   ```bash
   cd backend

npm install

Create a .env file in the backend folder and define the necessary environment variables:
JWT_SECRET=your_secret_key
DATABASE_URL="postgresql://postgres:database_123@localhost:5432/ecommerce"

Run database migrations using Prisma (if you haven't set up the database schema yet)
npx prisma migrate dev

npm run dev

Frontend Setup

cd frontend
npm install
npm start
