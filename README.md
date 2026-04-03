# Hospital Management System Frontend

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/badge/v-0.0.0-brightgreen)](https://github.com/vaibhavchaubey/Hospital-Management-System-Frontend)
[![Build Status](https://img.shields.io/badge/build-unknown-lightgrey)](#)

> React + TypeScript + Vite frontend for a Hospital Management System, supporting Admin, Doctor, and Patient roles.

## 🚀 What the project does

A single-page application (SPA) with role-based dashboards and CRUD flows for hospital workflows:

- Admin: Inventory, Medicines, Patients, Doctors, Sales, dashboard analytics
- Doctor: Appointments, patient list, profile, pharmacy, appointment details
- Patient: Book appointments, view profile, appointment history
- Shared: JWT auth, protected routes, API integration via `axios`

## 🌟 Why this project is useful

- Modular role-based UX for health operations
- Responsive dashboard with charts and key metrics
- Reusable service layer (`src/Service/*`) and centralized API interceptor (`src/Interceptor/AxiosInterceptor.tsx`)
- Consistent UI with Mantine, PrimeReact, Tailwind
- Redux Toolkit state management for JWT/profile data

## 🧩 Tech stack

- TypeScript + React 19
- Vite 7
- Mantine (UI), PrimeReact (tables), Recharts (charts)
- React Router DOM 7 (lazy routes)
- Redux Toolkit + React Redux
- Axios with interceptors
- Tailwind CSS

## 📁 Project structure

- `src/components`: UI components grouped by admin/doctor/patient modules
- `src/pages`: page views and route endpoints
- `src/Routes`: `AppRoutes`, `ProtectedRoute`, `PublicRoute`
- `src/Service`: API service functions
- `src/Interceptor`: global axios configuration
- `src/Slices`: redux slices (`JwtSlice`, `ProfileSlice`, `UserSlice`)

## 🛠️ Getting started

### Prerequisites

- Node.js 18+ / npm 10+
- Backend API running and available via env variable `VITE_API_URL` (default: `http://localhost:9000`)

### Install

```bash
npm install
```

### Environment configuration

Copy `.env.example` to `.env` and set the backend API URL:

```bash
cp .env.example .env
```

Example `.env`:

```ini
VITE_API_URL=http://localhost:9000
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:5173` (or output URL).

### Build for production

```bash
npm run build
```

Preview build output:

```bash
npm run preview
```

### Scripts

- `npm run dev`: start dev server
- `npm run build`: compile TypeScript + build static assets
- `npm run preview`: local preview of production build
- `npm run lint`: ESLint checks

## 🔐 Authentication and routes

- Public: `/`, `/register`, `/login`
- Admin: `/admin/**` (dashboard, medicine, inventory, sales, patients, doctors)
- Doctor: `/doctor/**` (dashboard, profile, pharmacy, patients, appointments)
- Patient: `/patient/**` (dashboard, profile, appointments)
- Fallback: `*` -> NotFound

`ProtectedRoute` checks Redux `state.jwt`; redirects unauthenticated users to `/login`.

## 🧩 API integration details

Uses base URL from `src/Interceptor/AxiosInterceptor.tsx`:

- `VITE_API_URL` environment variable
- JWT injection into `Authorization` header
- 401 intercept handles token expiry

Service examples:

- `src/Service/AppointmentService.ts` (schedule/cancel/get appointments, reports, prescriptions)
- `src/Service/MedicineService.ts`, `InventoryService.ts`, `UserService.ts`, etc.

## 📌 Supported roles and capabilities

- Admin: manage medicines, inventory, sales, users, and view analytics chart
- Doctor: manage appointments, patients, prescriptions, profile
- Patient: book appointments, view appointment history, manage profile

## 🛟 Where users can get help

- Issues: [github.com/vaibhavchaubey/Hospital-Management-System-Frontend/issues](https://github.com/vaibhavchaubey/Hospital-Management-System-Frontend/issues)
- Project README (this document)

## 🤝 Who maintains and contributes

Maintainer: **vaibhavchaubey**

Contribution flow (basic):

1. Fork repository
2. Create feature branch `feature/<name>`
3. Commit and push
4. Open PR against `main`

> Note: No `CONTRIBUTING.md` in repository; add `CONTRIBUTING.md` to define formal guidelines.

## ✅ Recommended next steps for contributors

- Add CI workflow and badge (`.github/workflows/...`)
- Add tests (Jest/React Testing Library)
- Add `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `LICENSE`
- Add backend mock or integration documentation

## 📝 References

- `src/Routes/AppRoutes.tsx`
- `src/Interceptor/AxiosInterceptor.tsx`
- `src/Service`
- `src/Slices````
