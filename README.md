# 🌳 Biswas Family | Family Tree & Heritage Platform

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![NextAuth](https://img.shields.io/badge/NextAuth.js-4.24-blueviolet?style=for-the-badge&logo=auth0)](https://next-auth.js.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap)](https://getbootstrap.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<br />

**A full-stack web application designed to preserve, visualize, and celebrate the genealogy, history, relationships, and heritage of the Biswas Family.**

[🌐 Live Demo](https://family.wapborhan.com) • [✨ Features](#-key-features) • [🚀 Quick Start](#-getting-started) • [🛠️ Tech Stack](#️-tech-stack) • [📡 API Reference](#-api-routes)

</div>

---

## 📖 Overview

**Biswas Family** is a modern genealogy and family archival platform built with Next.js (App Router), React, MongoDB, and NextAuth. It helps family members explore generational roots, trace ancestor connections, track biographical milestones, and maintain a centralized directory with rich regional localization for Bangladesh.

---

## ✨ Key Features

- **🌳 Interactive Family Tree & Kinship Tracking:**
  - Relational mapping between Parents (Father/Mother), Spouses, and Children.
  - Identification of Clan Root members versus joined/in-law family members.

- **👤 Comprehensive Member Profiles:**
  - Full personal records: birth/death dates, places, blood groups, and biographies.
  - Educational milestones (Primary, Secondary, Higher Secondary, University).
  - Career journey & work history tracking.
  - Honors, awards, and recognitions.
  - Photo gallery and profile picture uploads.
  - Social media and direct contact channels (Phone, WhatsApp, Email, Facebook, LinkedIn, Twitter).

- **📍 Bangladesh Administrative Address Integration:**
  - Built-in geo-data and postal database covering divisions, districts, police stations (thanas), and post offices for both present and permanent addresses.

- **📊 Management Dashboard:**
  - Real-time family census metrics (male count, female count, clan root members, joined members, total count).
  - Streamlined member creation, editing, and relational linkage.

- **🔐 Authentication & Role-Based Access:**
  - Google OAuth integration via NextAuth.js.
  - Role-based authorization (`admin` vs `user`) protecting member creation and administration dashboards.

- **🎨 Modern UI with Bengali Typography:**
  - Clean card-based responsive design inspired by modern portfolios.
  - Dual typography with **Hind Siliguri** (Bengali script) and **Poppins** (Latin script).
  - Smooth interactive controls including custom datepickers, searchable selects, and back-to-top helpers.

---

## 🛠️ Tech Stack

| Domain               | Technology                                                                                                                                                                             |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**        | [Next.js 16](https://nextjs.org/) (App Router, Server Actions, API Route Handlers)                                                                                                     |
| **Frontend Library** | [React 19](https://react.dev/)                                                                                                                                                         |
| **Database & ODM**   | [MongoDB](https://www.mongodb.com/) with [Mongoose 9](https://mongoosejs.com/)                                                                                                         |
| **Authentication**   | [NextAuth.js v4](https://next-auth.js.org/) (Google OAuth provider + JWT Sessions)                                                                                                     |
| **Styling & Design** | [Bootstrap 5](https://getbootstrap.com/) + Custom CSS theme                                                                                                                            |
| **Form Management**  | [React Hook Form](https://react-hook-form.com/)                                                                                                                                        |
| **UI Components**    | [React Select](https://react-select.com/), [React Datepicker](https://reactdatepicker.com/), [React Custom Back To Top](https://www.npmjs.com/package/react-custom-back-to-top-button) |
| **Data Fetching**    | [Axios](https://axios-http.com/)                                                                                                                                                       |
| **Fonts**            | Google Fonts (`Hind Siliguri` & `Poppins` via `next/font`)                                                                                                                             |

---

## 📁 Project Structure

```text
biswas-family-nextjs/
├── public/                     # Static assets (images, icons, favicons)
├── src/
│   ├── Models/                 # Mongoose schemas (Member, User)
│   │   ├── Member.js           # Family member schema with nested history
│   │   └── User.js             # Authenticated user & role schema
│   ├── Providers/              # Client-side context providers
│   │   ├── MainWrapper.jsx     # Header, Footer, and Back-to-Top wrapper
│   │   └── NextAuthSessionProvider.jsx # NextAuth session provider
│   ├── app/                    # Next.js App Router pages and APIs
│   │   ├── api/                # Backend API route handlers
│   │   │   ├── auth/           # NextAuth route handlers
│   │   │   ├── member/[id]/    # Single member CRUD operations
│   │   │   └── members/        # Member listing, filters, and creation
│   │   ├── auth/               # Login and auth action views
│   │   ├── dashboard/          # Admin dashboard & Add Member workflow
│   │   ├── member/[id]/        # Detailed single member profile page
│   │   ├── members/            # Public family directory list
│   │   ├── layout.js           # Root layout with font imports
│   │   ├── metadata.js         # SEO metadata and OpenGraph configuration
│   │   └── page.js             # Homepage banner & landing view
│   ├── assets/                 # CSS stylesheets and UI icon assets
│   ├── components/             # Reusable UI components
│   │   ├── Banner.jsx          # Hero section
│   │   ├── Header.jsx          # Navigation bar with auth state
│   │   ├── Footer.jsx          # Site footer
│   │   ├── Members.jsx         # Member showcase components
│   │   └── shared/             # DashCard, MemberCard, PickDate, SVGTik
│   └── lib/                    # Shared utilities, database & configs
│       ├── authOptions.js      # NextAuth options & Google OAuth setup
│       ├── axiosInstance.js    # Pre-configured Axios client
│       ├── bangladeshGeoData.js # Bangladesh administrative divisions & districts
│       ├── bangladeshPostData.js# Bangladesh post office data
│       ├── calculateAge.js     # Age calculation utility
│       ├── dbConnect.js        # Cached Mongoose MongoDB connection
│       └── fetchMembers.js     # Server-side member fetching helper
├── .env.example                # Sample environment variables template
├── next.config.mjs             # Next.js configuration
├── package.json                # Project dependencies and npm scripts
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.18.0 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally or a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster URI
- A Google Cloud Project with [Google OAuth 2.0 Client Credentials](https://console.cloud.google.com/apis/credentials)

### 1. Clone the Repository

```bash
git clone https://github.com/wapborhan/biswas-family-nextjs.git
cd biswas-family-nextjs
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env.local
```

Fill in the appropriate configuration keys:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017
DB_NAME=biswasFamilyDB

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_string

# API Base URL
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> **Tip:** You can generate a secure `NEXTAUTH_SECRET` by running:
>
> ```bash
> openssl rand -base64 32
> ```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

| Script          | Description                                                                      |
| --------------- | -------------------------------------------------------------------------------- |
| `npm run dev`   | Starts the Next.js development server with hot-reload at `http://localhost:3000` |
| `npm run build` | Compiles and builds the production-ready bundle                                  |
| `npm run start` | Starts the production server after building                                      |
| `npm run lint`  | Runs ESLint to verify code quality and style standards                           |

---

## 📡 API Routes

| Method   | Endpoint                  | Description                                              | Access |
| -------- | ------------------------- | -------------------------------------------------------- | ------ |
| `GET`    | `/api/members`            | Get all family members with filtering and projection     | Public |
| `POST`   | `/api/members`            | Create a new family member record                        | Admin  |
| `GET`    | `/api/member/[id]`        | Fetch single member profile with populated relationships | Public |
| `PUT`    | `/api/member/[id]`        | Update an existing member record                         | Admin  |
| `DELETE` | `/api/member/[id]`        | Delete a member record                                   | Admin  |
| `ALL`    | `/api/auth/[...nextauth]` | NextAuth authentication handler endpoints                | Public |

---

## 🚢 Deployment

### Deploy on Vercel

The easiest way to deploy this Next.js app is through [Vercel](https://vercel.com/):

1. Push your repository to GitHub.
2. Import the project into Vercel.
3. Configure the environment variables (`MONGODB_URI`, `DB_NAME`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `NEXT_PUBLIC_API_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`) in the Vercel Dashboard.
4. Set the authorized redirect URI in the Google Cloud Console to:
   ```text
   https://<your-domain>/api/auth/callback/google
   ```
5. Click **Deploy**.

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Borhan Uddin**

- Website: [family.wapborhan.com](https://family.wapborhan.com)
- GitHub: [@wapborhan](https://github.com/wapborhan)
