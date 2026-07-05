# 🏛️ Gemarse Estate

<p align="center">
  <strong>A luxury real estate rental and property management platform.</strong><br>
  <em>Designed with modern architecture, premium UI/UX, and enterprise-grade full-stack technologies.</em>
</p>

<p align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Express.js](https://img.shields.io/badge/Express.js-API-000000?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma-336791?logo=postgresql)
![AWS](https://img.shields.io/badge/AWS-Amplify%20%7C%20Cognito%20%7C%20S3-FF9900?logo=amazonaws)
![Mapbox](https://img.shields.io/badge/Mapbox-Maps-000000?logo=mapbox)
![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)
![License](https://img.shields.io/badge/License-ISC-blue)

</p>

<p align="center">

### 🌐 Live Demo

https://main.d2mesgux8km4a1.amplifyapp.com/

</p>

---

<p align="center">

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/4cbd04df-ebcc-4f97-a0d8-a3f70fa82ada" />

</p>

---

## ✨ Highlights

- 🏡 Luxury real estate rental platform
- 🗺️ Interactive Mapbox property search
- 🔐 Secure authentication with AWS Cognito
- 👥 Role-Based Access Control (RBAC)
- ❤️ Favorites & rental applications
- 🏢 Property management dashboard
- 📱 Fully responsive across devices
- ☁️ AWS cloud integration
- ⚡ Built with Next.js 15 & Express.js

---

# 📖 About the Project

Gemarse Estate is a full-stack luxury real estate rental platform built to demonstrate modern web application architecture while delivering a premium user experience.

The platform provides an elegant experience for **Tenants** searching for rental properties and **Property Managers** managing listings, applications, and residents.

Beyond showcasing beautiful UI/UX, the project emphasizes scalable architecture, cloud integration, secure authentication, interactive mapping, and maintainable code organization.

---

# 🚀 Features

## 🏡 Property Discovery

- Interactive Mapbox property search
- Advanced filtering by location, price, size, and amenities
- Responsive browsing experience

---

## ❤️ Tenant Experience

- Save favorite properties
- Submit rental applications
- Manage profile information
- Track rental history

---

## 🏢 Property Management

- Create, edit, and delete property listings
- Review tenant applications
- Manage tenants and property assignments
- Dashboard overview

---

## 🔐 Authentication & Security

- AWS Cognito Authentication
- JWT Authorization
- Role-Based Access Control (RBAC)
- Protected routes
- Secure API endpoints

---

# 🏗 Architecture

```text
                     Next.js Client
                           │
                   RTK Query / REST API
                           │
                    Express.js Server
                           │
          ┌────────────────┴────────────────┐
          │                                 │
     PostgreSQL (Prisma)              AWS Services
                                      ├── Cognito
                                      └── S3
```

---

# 🛠 Tech Stack

| Frontend | Backend | Cloud & Services |
|-----------|----------|------------------|
| Next.js 15 | Express.js | AWS Amplify |
| TypeScript | PostgreSQL | AWS Cognito |
| Tailwind CSS | Prisma ORM | AWS S3 |
| Redux Toolkit | JWT Authentication | Mapbox |
| RTK Query | REST API | |
| Shadcn UI | | |
| Framer Motion | | |

---


# 🎯 Why I Built This

Gemarse Estate was built to simulate a production-ready real estate platform while demonstrating modern full-stack development practices.

The project focuses on:

- Premium UI/UX design
- Enterprise-style architecture
- Secure authentication
- Cloud integration with AWS
- Interactive map experiences
- Responsive design
- Scalable backend architecture

---

# ⚡ Getting Started

## Prerequisites

- Node.js 18+
- PostgreSQL
- AWS Account (Cognito & S3)
- Mapbox API Key

---

## Installation

Clone the repository.

```bash
git clone https://github.com/gerardsegismundo/gemarse-estate.git

cd gemarse-estate
```

Install dependencies.

```bash
npm install

cd client
npm install

cd ../server
npm install
```

---

## Environment Variables

### Client

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

### Server

```env
PORT=8000

DATABASE_URL=postgresql://...

JWT_SECRET=your_secret

AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...

S3_BUCKET_NAME=...
```

---

## Database

```bash
cd server

npx prisma migrate dev

npx prisma db seed
```

---

## Run the Application

Development mode.

```bash
npm run dev
```

Or separately.

```bash
npm run dev:client

npm run dev:server
```

Client

```
http://localhost:3000
```

Server

```
http://localhost:8000
```

---

# 📁 Project Structure

```text
client/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── state/
│   └── types/
│
└── public/

server/
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── prisma/
```

---

# 📡 API Overview

| Endpoint | Description |
|-----------|-------------|
| GET /properties | Retrieve properties |
| POST /properties | Create listing |
| GET /applications | View applications |
| POST /applications | Submit application |
| PUT /applications/:id/status | Update application |
| GET /tenants/:id | Tenant profile |
| GET /managers/:id | Manager profile |

---

# 📜 License

Licensed under the ISC License.
