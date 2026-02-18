# Gemarse Estate

A modern real estate rental platform built with Next.js, Express, PostgreSQL, and AWS.

## Features

- **Property Listings**: Browse available rental properties with advanced filtering
- **User Authentication**: Sign up and login with AWS Cognito
- **Role-based Access**: Separate dashboards for Tenants and Managers
- **Property Management**: Managers can create and manage property listings
- **Application System**: Tenants can apply to properties
- **Favorites**: Tenants can save favorite properties
- **Map Integration**: View properties on an interactive map (Mapbox)
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **AWS Amplify** - Authentication
- **Mapbox GL** - Maps
- **Framer Motion** - Animations
- **Radix UI** - UI components

### Backend

- **Express.js** - API server
- **PostgreSQL** - Database
- **Prisma** - ORM
- **AWS S3** - File storage
- **JWT** - Authentication

## Prerequisites

- Node.js 18+
- PostgreSQL database
- AWS Account (Cognito, S3)
- Mapbox API key

## Installation

1. Clone the repository:

```bash
git clone https://github.com/gerardsegismundo/gemarse-estate.git
cd gemarse-estate
```

2. Install dependencies:

```bash
# Root dependencies
npm install

# Client dependencies
cd client && npm install

# Server dependencies
cd ../server && npm install
```

3. Set up environment variables:

Create `client/.env`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

Create `server/.env`:

```env
PORT=8000
JWT_SECRET=your_jwt_secret
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
S3_BUCKET_NAME=your_s3_bucket
```

4. Set up the database:

```bash
cd server
npx prisma migrate dev
npx prisma db seed
```

## Running the Application

### Development Mode

Run both client and server:

```bash
npm run dev
```

Or run separately:

```bash
# Terminal 1 - Server
npm run dev:server

# Terminal 2 - Client
npm run dev:client
```

- Client: http://localhost:3000
- Server: http://localhost:8000

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   │   ├── (auth)/    # Auth pages
│   │   │   ├── (dashboard)/ # Dashboard pages
│   │   │   ├── (nondashboard)/ # Public pages
│   │   │   └── search/    # Property search
│   │   ├── components/    # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── lib/          # Utilities
│   │   ├── state/        # Redux store
│   │   └── types/        # TypeScript types
│   └── public/           # Static assets
│
├── server/                 # Express API
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Express middleware
│   │   ├── routes/       # API routes
│   │   └── services/     # Business logic
│   └── prisma/           # Database schema
│
└── package.json           # Root scripts
```

## API Endpoints

### Properties

- `GET /properties` - List all properties
- `GET /properties/:id` - Get property details
- `POST /properties` - Create property (Manager only)

### Applications

- `GET /applications` - List applications
- `POST /applications` - Submit application
- `PUT /applications/:id/status` - Update status (Manager only)

### Tenants

- `GET /tenants/:id` - Get tenant profile
- `PUT /tenants/:id` - Update tenant settings
- `POST /tenants/:id/favorites/:propertyId` - Add favorite

### Managers

- `GET /managers/:id` - Get manager profile
- `GET /managers/:id/properties` - Get manager's properties

## Scripts

- `npm run dev` - Start development servers
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed` - Seed database (server)

## License

ISC
