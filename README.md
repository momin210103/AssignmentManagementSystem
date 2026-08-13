# Assignment Management System

An Assignment Management System (AMS) is a web-based application designed to manage students, teachers, classes, subjects, assignments, submissions, grading, and application-level settings.

The system provides separate functionality for three roles:

- Admin
- Teacher
- Student

## Features

### Admin

- Manage students and teachers
- Manage classes
- Assign students to classes
- Remove students from classes
- Assign teachers to classes/subjects
- View class-wise students
- View assignments and submissions
- Manage application-level settings

### Teacher

- View assigned classes/subjects
- Create assignments
- Define assignment title, description, deadline, and maximum marks
- Publish assignments or keep them as drafts
- View student submissions
- Assign marks
- Provide feedback
- Update submission status

### Student

- View assignments assigned to their class/course
- View assignment details
- Submit answers
- Update submissions before the deadline when allowed
- View submission status
- View marks
- View teacher feedback

## Technology Stack

### Backend

- ASP.NET Core Web API
- .NET
- Entity Framework Core
- PostgreSQL
- ASP.NET Core Identity
- JWT Authentication
- MediatR
- FluentValidation
- Serilog
- Swagger / OpenAPI

### Frontend

- React
- TypeScript
- Vite
- TanStack React Query
- Axios
- Tailwind CSS
- React Router
- Lucide React

## Prerequisites

Before running the project, make sure the following software is installed.

### Required

- Git version 2.43.0
- .NET SDK 10.0.110
- Target Framework: .NET 10
- Node.js v20.20.2
- npm 10.8.2
- PostgreSQL 16.14

### Verify Installation

Check the installed versions:

```bash
git --version
dotnet --version
node --version
npm --version
psql --version
```

## Database Setup

The application uses PostgreSQL as the database.

### 1. Create PostgreSQL Database

Make sure PostgreSQL is running on your local machine.

The default configuration expects:

| Setting  | Value       |
| -------- | ----------- |
| Host     | `localhost` |
| Port     | `5432`      |
| Database | `AMSDb`     |
| Username | `postgres`  |

### 2. Configure Connection String

Navigate to:

```text
backend/src/AMS.API/
```

Update the connection string in `appsettings.json` (or `appsettings.Development.json`) to match your local PostgreSQL configuration.

### 3. Apply Database Migrations

Navigate to the backend directory:

```bash
cd backend/src
```

Run the migration command:

```bash
dotnet ef database update \
  --project AMS.Infrastructure \
  --startup-project AMS.API
```

## Backend Setup

Navigate to the API project:

```bash
cd backend/src/AMS.API
dotnet restore
dotnet run
```

Backend will be available at:

```text
http://localhost:5175
```

Once running, the API swagger documentation is available at:

```text
http://localhost:5175/swagger
```

## Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173/
```

.env file in the frontend directory should contain the backend API URL:

```text
VITE_API_BASE_URL=http://localhost:5175/api
```

## Demo Credentials

The application automatically creates demo users when the API starts with a fresh database.

### Admin

| Email           | Password  |
| --------------- | --------- |
| admin@gmail.com | Admin@123 |

### Teachers

| Email                     | Password    |
| ------------------------- | ----------- |
| sarah.ahmed@gmail.com     | Teacher@123 |
| michael.johnson@gmail.com | Teacher@123 |
| james.wilson@gmail.com    | Teacher@123 |

### Students

| Email                   | Password    |
| ----------------------- | ----------- |
| ayesha.rahman@gmail.com | Student@123 |
| tanvir.hasan@gmail.com  | Student@123 |
| nusrat.jahan@gmail.com  | Student@123 |
| rakib.hossain@gmail.com | Student@123 |
| sadia.islam@gmail.com   | Student@123 |

## Assumptions

- PostgreSQL is available locally and runs on the default port `5432`.
- The application is configured for local development.
- Initial demo data is created automatically through database seeders.
- Demo users are provided for Admin, Teacher, and Student roles.
- The frontend runs on the default Vite development port `5173`.

## Known Limitations

- The application is primarily configured for local development and demonstration.
- Production deployment configuration is not included.
- Production secrets must be configured separately.
- Email/SMS notification services are not included.
