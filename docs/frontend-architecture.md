# Frontend Architecture

**Project:** Assignment Management System (AMS)

**Version:** 1.0

**Last Updated:** 2026-08-13

---

# Purpose

This document defines the official frontend architecture for the Assignment Management System.

This architecture is considered **frozen** for this project and should not be modified unless there is a strong technical justification.

---

# Technology Stack

- React 19
- TypeScript
- Vite
- React Router
- Axios
- TanStack Query
- React Hook Form
- Zod
- Tailwind CSS


---

# Folder Structure

```text
src
├── api
├── app
├── assets
│   ├── icons
│   ├── images
│   └── logo
├── components
│   ├── common
│   ├── layout
│   └── ui
├── constants
├── contexts
├── features
│   ├── admin
│   │   ├── assignments
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   ├── pages
│   │   │   ├── services
│   │   │   └── types
│   │   ├── classes
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   ├── pages
│   │   │   ├── services
│   │   │   └── types
│   │   ├── dashboard
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   ├── pages
│   │   │   └── services
│   │   ├── profile
│   │   ├── settings
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   ├── pages
│   │   │   ├── services
│   │   │   └── types
│   │   ├── students
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   ├── pages
│   │   │   ├── schemas
│   │   │   ├── services
│   │   │   └── types
│   │   ├── subjects
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   ├── pages
│   │   │   └── services
│   │   ├── submissions
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   ├── pages
│   │   │   └── services
│   │   ├── teacher-assign
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   ├── pages
│   │   │   └── services
│   │   └── teachers
│   │       ├── components
│   │       ├── hooks
│   │       ├── pages
│   │       ├── schemas
│   │       ├── services
│   │       └── types
│   ├── auth
│   │   ├── api
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   ├── types
│   │   ├── utils
│   │   └── validation
│   ├── profile
│   │   ├── hooks
│   │   ├── services
│   │   └── types
│   ├── student
│   │   ├── assignments
│   │   │   ├── hooks
│   │   │   ├── pages
│   │   │   ├── services
│   │   │   └── types
│   │   ├── dashboard
│   │   │   ├── components
│   │   │   └── pages
│   │   ├── profile
│   │   └── submissions
│   │       ├── hooks
│   │       ├── pages
│   │       ├── services
│   │       └── types
│   └── teacher
│       ├── assignments
│       │   ├── components
│       │   ├── hooks
│       │   ├── pages
│       │   ├── schemas
│       │   ├── services
│       │   └── types
│       ├── dashboard
│       │   ├── components
│       │   └── pages
│       ├── grading
│       ├── profile
│       └── submissions
│           ├── components
│           ├── hooks
│           ├── services
│           └── types
├── hooks
├── layouts
├── routes
└── types
```

---

# Architecture Principles

The frontend follows a hybrid architecture:

- Role-based organization
- Feature-based implementation
- Shared reusable components
- Centralized API configuration

This keeps the project scalable, maintainable, and easy to understand.

---

# Project Rules

## Rule 1

Every business module must be placed inside the **features** directory.

---

## Rule 2

Never call an API directly from UI components.

Correct Flow:

```
Page
    ↓
Hook
    ↓
API
    ↓
Axios
```

---

## Rule 3

Reusable UI components belong in:

```
components/common
```

---

## Rule 4

Each feature owns its own:

- API
- Components
- Hooks
- Pages
- Types
- Validation Schema

---

## Rule 5

Authentication belongs only inside:

```
features/auth
```

---

## Rule 6

Application layouts belong only inside:

```
layouts/
```

---

## Rule 7

Application routing belongs only inside:

```
routes/
```

---

## Rule 8

Environment variables must be accessed through:

```
import.meta.env
```

Never hardcode:

- API URLs
- Secrets
- Environment-specific values

---

## Rule 9

Axios must be used for every HTTP request.

Do not use Fetch API.

---

## Rule 10

Use TanStack Query for server state management.

Do not manually store API data inside components.

---

## Rule 11

Use React Hook Form + Zod for every form.

---

## Rule 12

Use TypeScript everywhere.

Avoid using:

```ts
any;
```

unless absolutely necessary.

---

# Authentication Flow

```
Login

↓

Receive JWT

↓

Store Token

↓

Axios Interceptor

↓

Protected Route

↓

Dashboard
```

---

# Routing

```
/

↓

login

↓

admin/dashboard

↓

teacher/dashboard

↓

student/dashboard
```

---

# Future Features

New modules should be added under:

```
features/
```

Examples:

- notifications
- attendance
- calendar
- chat
- analytics


---

# Notes

This architecture is considered **stable**.

Changing this structure after implementation has started is discouraged unless there is a significant architectural reason.

End of Document.
