# Gemarse Estate 🏛️

**Live Demo:** [https://main.d2mesgux8km4a1.amplifyapp.com/](https://main.d2mesgux8km4a1.amplifyapp.com/)

The Pinnacle of Modern Living — A full-stack, luxury real estate rental and management platform designed for seamless property discovery, management, and residency experience.

Gemarse Estate combines minimalist, high-end design with robust functionality for both Tenants and Managers, providing an elegant, intuitive platform to browse, manage, and apply to rental properties.

## 📋 Overview

Gemarse Estate is built with a focus on luxury UI/UX, performance, and maintainable architecture. Tenants can discover and favorite properties with advanced search filters, while Managers can efficiently handle listings, applications, and unit assignments.

The platform features a role-based access control system (RBAC) and a customized authentication flow, ensuring a seamless and secure experience for every user.

## 📸 Screenshots

### Landing Page

![Landing Page](client/public/screenshot_landing-page.png)

### Search Page

![Search Page](client/public/screenshot_search-page.png)

## 🚀 Tech Stack

### Frontend

- **Next.js 15** — React framework with App Router
- **TypeScript** — Type safety across the app
- **Tailwind CSS** — Utility-first styling
- **Redux Toolkit & RTK Query** — State management and data fetching
- **Shadcn UI & Radix Primitives** — Accessible, reusable components
- **Lucide React** — Lightweight icons
- **Framer Motion** — Smooth animations
- **Mapbox GL** — Interactive property maps

### Backend

- **Express.js** — API server
- **PostgreSQL** — Relational database
- **Prisma** — ORM for database interactions
- **AWS S3** — File storage for property images
- **AWS Amplify Auth (Cognito)** — Authentication and user management
- **JWT** — Secure API authentication

## ✨ Key Features

### For Tenants

- **Property Discovery**: Browse high-end listings with filters by location, price, size, and amenities
- **Favorites**: Save properties for later
- **Application System**: Apply to properties directly via the platform
- **Profile Management**: Manage personal information and rental history
- **Responsive Design**: Optimized for desktop and mobile

### For Managers

- **Dashboard**: Overview of properties, applications, and tenants
- **Property Management**: Create, update, and remove listings
- **Application Tracking**: Approve or reject tenant applications
- **Role-Based Access**: Manage user permissions for staff and tenants

### Luxury UI/UX

- Minimalist design with high-contrast serif typography (Didot/Bodoni inspired)
- Smooth animations and transitions
- Dynamic navigation that adapts to scrolling and context
- Custom-branded authentication experience

## 🏗️ Prerequisites

- Node.js 18+
- PostgreSQL database
- AWS Account (Cognito, S3)
- Mapbox API key

## ⚡ Installation

Clone the repository:

```bash
git clone https://github.com/gerardsegismundo/gemarse-estate.git
cd gemarse-estate
```

Install dependencies:

```bash
# Root dependencies
npm install

# Frontend dependencies
cd client && npm install

# Backend dependencies
cd ../server && npm install
```

Set up environment variables:

**client/.env:**

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

**server/.env:**

```env
PORT=8000
JWT_SECRET=your_jwt_secret
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
S3_BUCKET_NAME=your_s3_bucket
```

Initialize the database:

```bash
cd server
npx prisma migrate dev
npx prisma db seed
```

## 🖥️ Running the Application

### Development Mode

Run both client and server concurrently:

```bash
npm run dev
```

Or separately:

```bash
# Terminal 1 - Server
npm run dev:server

# Terminal 2 - Client
npm run dev:client
```

- **Client:** http://localhost:3000
- **Server:** http://localhost:8000

### Production Build

```bash
npm run build
npm run start
```

## 🗂️ Project Structure

```
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   │   ├── (auth)/   # Authentication
│   │   │   ├── (dashboard)/ # Manager & Tenant dashboards
│   │   │   ├── (nondashboard)/ # Landing & public pages
│   │   │   └── search/   # Property search
│   │   ├── components/   # Reusable components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities & helpers
│   │   ├── state/        # Redux store & slices
│   │   └── types/        # TypeScript types
│   └── public/           # Static assets
│
├── server/                # Express backend
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── middleware/   # Auth & other middleware
│   │   ├── routes/       # API endpoints
│   │   └── services/     # Business logic
│   └── prisma/           # Database schema
│
└── package.json          # Root scripts
```

## 📡 API Endpoints

### Properties

| Method | Endpoint          | Description                    |
| ------ | ----------------- | ------------------------------ |
| GET    | `/properties`     | List all properties            |
| GET    | `/properties/:id` | Get property details           |
| POST   | `/properties`     | Create property (Manager only) |

### Applications

| Method | Endpoint                   | Description                  |
| ------ | -------------------------- | ---------------------------- |
| GET    | `/applications`            | List applications            |
| POST   | `/applications`            | Submit application           |
| PUT    | `/applications/:id/status` | Update status (Manager only) |

### Tenants

| Method | Endpoint                             | Description            |
| ------ | ------------------------------------ | ---------------------- |
| GET    | `/tenants/:id`                       | Get tenant profile     |
| PUT    | `/tenants/:id`                       | Update tenant settings |
| POST   | `/tenants/:id/favorites/:propertyId` | Add favorite           |

### Managers

| Method | Endpoint                   | Description              |
| ------ | -------------------------- | ------------------------ |
| GET    | `/managers/:id`            | Get manager profile      |
| GET    | `/managers/:id/properties` | Get manager's properties |

## 🛠️ Scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start client & server in development |
| `npm run build` | Build production client              |
| `npm run start` | Start production server              |
| `npm run seed`  | Seed the database                    |

## 📜 License

ISC
