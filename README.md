# Hospital Management System - Frontend

[![React](https://img.shields.io/badge/React-19.2.0-61dafb)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0-646cff)](https://vitejs.dev/)
[![Redux](https://img.shields.io/badge/Redux%20Toolkit-2.8-764abc)](https://redux-toolkit.js.org/)
[![Mantine UI](https://img.shields.io/badge/Mantine%20UI-8.3-339af0)](https://mantine.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-06b6d4)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933)](https://nodejs.org/)

## 🚀 What the Project Does

**Hospital Management System (HMS) Frontend** is a comprehensive React + TypeScript SPA that provides role-based dashboards for hospital staff, doctors, and patients. It serves as the primary user interface for a microservices-based hospital management ecosystem, enabling appointment scheduling, patient & doctor profile management, medicine inventory tracking, sales management, and medical record organization. The frontend communicates with multiple Spring Boot microservices through a centralized API Gateway, featuring real-time dashboards, charts, and notifications for streamlined healthcare operations.

## 💡 Why the Project is Useful

- **Role-Based Dashboards**: Dedicated interfaces for Admin, Doctor, and Patient roles with tailored workflows and permissions.
- **Comprehensive Hospital Management**: Manage appointments, patient profiles, doctor credentials, medicines, inventory, and sales—all from one integrated platform.
- **Real-Time Analytics**: Visual dashboards with charts and metrics for monitoring hospital operations, patient visits, and pharmacy sales.
- **Seamless Microservices Integration**: Consumes APIs from 7 backend microservices via a centralized API Gateway, maintaining clean separation of concerns.
- **Professional UI/UX**: Built with Mantine UI and PrimeReact for modern, accessible, and responsive user interfaces.
- **Type-Safe Development**: Full TypeScript support ensures maintainability and catches errors at compile time.
- **Redux State Management**: Centralized state management for JWT tokens, user profiles, and application data.

## ✨ Key Features

- **Implemented Admin Dashboard**: View hospital analytics, manage doctors, patients, appointments, medicine inventory, and sales with comprehensive charts and metrics.
- **Built Doctor Portal**: Doctors can view appointments, manage patient records, access medicine information, and update their profiles.
- **Designed Patient Dashboard**: Patients can schedule and track appointments, view their profiles, and access medical history.
- **Optimized Appointment Scheduling**: Integrated appointment management with real-time updates and conflict detection.
- **Medicine Inventory Management**: Track medicine stock, categories, dosages, and pricing with sales transaction recording.
- **Secure Authentication**: JWT-based login/registration with role-based access control and protected routes.
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS and Mantine responsive components.
- **Real-Time Notifications**: Toast notifications for user actions, errors, and system updates via Mantine Notifications.
- **File Upload Support**: Dropzone integration for profile picture uploads and media management.
- **Advanced Filtering & Sorting**: Dynamic dropdowns and data filtering across all modules.

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19.2
- **Language**: TypeScript 5.8
- **Build Tool**: Vite 7.0
- **State Management**: Redux Toolkit 2.8
- **UI Frameworks**:
  - Mantine UI 8.3 (Components, Hooks, Dates, Form, Modals, Dropzone, Charts, Notifications, Spotlight)
  - PrimeReact 10.9 (Additional premium components)
  - Tailwind CSS 4.1
- **Routing**: React Router DOM 7.6
- **HTTP Client**: Axios 1.10
- **Charts**: Recharts 3.6, Mantine Charts
- **Icons**: Tabler Icons React 3.34
- **Utilities**:
  - JWT Decode 4.0 (Token decoding)
  - Day.js 1.11 (Date manipulation)
  - PrimeIcons 7.0 (Icon library)

### DevOps / Tools

- **Package Manager**: npm
- **Linter**: ESLint 9.29
- **Plugin**: Vite React Plugin / Tailwind CSS Vite Plugin
- **Node.js**: 18+ required

## ⚙️ Getting Started (Installation & Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/vaibhavchaubey/Hospital-Management-System-Frontend.git
cd Hospital-Management-System-Frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Then update `.env` with your configuration:

```env
VITE_API_URL=http://localhost:9000
```

**API Gateway URL**: Points to the API Gateway microservice (default: `http://localhost:9000`)

### 4. Run Development Server

```bash
npm run dev
```

The frontend starts on `http://localhost:5173` by default. Open your browser and navigate to the application.

### 5. Build for Production

```bash
npm run build
```

Generates optimized production bundle in the `dist/` directory.

### 6. Preview Production Build

```bash
npm run preview
```

### 7. Lint Code

```bash
npm run lint
```

Runs ESLint to check for code quality and style issues.

## 🏗️ Project Structure

```
src/
├── App.tsx                    # Root component
├── main.tsx                   # Entry point
├── store.ts                   # Redux store configuration
├── index.css                  # Global styles
├── global.d.ts                # Global type definitions
├── vite-env.d.ts              # Vite environment types
├── components/
│   ├── Admin/                 # Admin dashboard components
│   │   ├── Dashboard/
│   │   ├── Doctors/
│   │   ├── Patients/
│   │   ├── Appointments/
│   │   ├── Medicines/
│   │   ├── Inventory/
│   │   ├── Sales/
│   │   └── Sidebar/
│   ├── Doctor/                # Doctor portal components
│   │   ├── Dashboard/
│   │   ├── Appointment/
│   │   ├── Patients/
│   │   ├── Medicine/
│   │   ├── Profile/
│   │   └── Sidebar/
│   ├── Patient/               # Patient dashboard components
│   │   ├── Dashboard/
│   │   ├── Appointment/
│   │   ├── Profile/
│   │   └── Sidebar/
│   ├── Header/                # Navigation header & profile menu
│   ├── Layout/                # Role-based layout components
│   ├── SideDrawer/            # Mobile drawer navigation
│   ├── Utility/               # Utility components (Dropzone, etc.)
│   ├── Data/                  # Mock data & dropdown data
│   └── Interceptor/           # Axios interceptors
├── pages/
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── NotFoundPage.tsx
│   ├── Admin/                 # Admin page routes
│   ├── Doctor/                # Doctor page routes
│   └── Patient/               # Patient page routes
├── Routes/
│   ├── AppRoutes.tsx          # Main route configuration
│   ├── ProtectedRoute.tsx     # Protected route wrapper
│   └── PublicRoute.tsx        # Public route wrapper
├── Service/                   # API service modules
│   ├── UserService.ts
│   ├── ProfileService.ts
│   ├── AppointmentService.ts
│   ├── MedicineService.ts
│   ├── InventoryService.ts
│   ├── SalesService.ts
│   ├── MediaService.ts
│   └── ...
├── Slices/                    # Redux slices (reducers)
│   ├── JwtSlice.ts
│   ├── UserSlice.ts
│   └── ProfileSlice.ts
├── types/
│   └── index.ts               # TypeScript type definitions
└── Utility/                   # Utility functions
    ├── DateUtility.ts
    ├── NotificationUtil.tsx
    └── OtherUtility.ts
```

## 🌐 Backend Microservices

The frontend consumes APIs from the following microservices. Each service has its own dedicated repository with detailed documentation:

### 1. Gateway Microservice

Acts as the API Gateway and single entry point for all frontend requests. Handles JWT token validation, CORS configuration, and routes requests to appropriate backend microservices.  
**Repository**: [gateway-microservice-hms](https://github.com/vaibhavchaubey/gateway-microservice-hms)

### 2. Eureka Server

Centralized service registry for microservice discovery. All backend services register themselves with Eureka, enabling dynamic service location and load balancing.  
**Repository**: [eureka-server-hms](https://github.com/vaibhavchaubey/eureka-server-hms)

### 3. User Microservice

Handles user authentication, registration, login, and JWT token generation. Manages user accounts and role-based delegation to profile services.  
**Repository**: [user-microservice-hms](https://github.com/vaibhavchaubey/user-microservice-hms)

### 4. Profile Microservice

Manages doctor and patient profile data. Provides CRUD operations, profile validation, and dropdown/batch lookup endpoints for UI integration.  
**Repository**: [profile-microservice-hms](https://github.com/vaibhavchaubey/profile-microservice-hms)

### 5. Appointment Microservice

Handles appointment scheduling, cancellation, and querying. Provides analytics endpoints for appointment history, reason counts, and prescription management.  
**Repository**: [appointment-microservice-hms](https://github.com/vaibhavchaubey/appointment-microservice-hms)

### 6. Pharmacy Microservice

Manages medicine inventory, sales transactions, and pharmacy operations. Tracks medicine stock levels, categories, dosages, and sales records.  
**Repository**: [pharmacy-microservice-hms](https://github.com/vaibhavchaubey/pharmacy-microservice-hms)

### 7. Media Microservice

Handles file uploads and storage operations. Manages patient records, medical documentation, and profile pictures in a centralized media repository.  
**Repository**: [media-microservice-hms](https://github.com/vaibhavchaubey/media-microservice-hms)

---

## 🔌 API Integration

The frontend communicates with the backend services through the **API Gateway** at `VITE_API_URL`. All requests include:

```
Authorization: Bearer <JWT_TOKEN>
```

Exception: login and register endpoints bypass token validation.

### Key API Endpoints (via Gateway)

- `POST /user/login` - User authentication
- `POST /user/register` - User registration
- `GET /profile/{role}/{id}` - Get user profile
- `POST /appointment/schedule` - Schedule appointment
- `GET /appointment/getAllByPatient/{patientId}` - Fetch patient appointments
- `GET /medicine/getAll` - List medicines
- `POST /sale/create` - Record sale transaction
- `POST /media/upload` - Upload files

## 🧪 Testing

```bash
npm run test
```

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

Build output is in `dist/` directory, ready for deployment to any static hosting service.

### Environment Variables for Production

Update `.env` or set environment variables:

```env
VITE_API_URL=https://your-api-gateway-url.com
```

### Deployment Options

- **Vercel**: `npm run build` → Deploy `dist/` folder
- **Netlify**: `npm run build` → Build output: `dist/`
- **Docker**: Create a `Dockerfile` to containerize the React app with Node.js or Nginx
- **GitHub Pages**: Configure build settings to deploy `dist/` folder
- **AWS S3 + CloudFront**: Upload `dist/` to S3 bucket with CloudFront distribution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Run linter (`npm run lint`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a Pull Request with a clear description and linked issue

## 📝 License

Add your open source / corporate license file at `/LICENSE` (e.g., Apache-2.0, MIT, etc.).

---

**Part of the Hospital Management System (HMS)** - A complete microservices-based healthcare management platform built with modern cloud-native technologies.
