## Backend Architecture

The backend follows Clean Architecture principles and is divided into four main layers:

The backend follows Clean Architecture principles to separate business logic, application logic, domain models, and infrastructure concerns.

- **AMS.API** handles HTTP requests, controllers, middleware, and API configuration.
- **AMS.Application** contains application features, commands, queries, DTOs, validators, and business logic orchestration.
- **AMS.Domain** contains the core domain entities, constants, enums, and domain rules.
- **AMS.Infrastructure** handles database access, Identity, JWT services, migrations, seeders, and other infrastructure concerns.
- **AMS.Tests** contains unit tests for the application features.

**The backend uses MediatR for CQRS-style command and query handling, FluentValidation for request validation, Serilog for logging, and Entity Framework Core with PostgreSQL for data persistence.**

```text
backend/
├── src/
│   ├── AMS.API/
│   │   ├── Controllers/
│   │   │   ├── Admin/
│   │   │   └── Profile/
│   │   ├── logs/
│   │   ├── Middleware/
│   │   ├── Properties/
│   │   └── wwwroot/
│   │       └── uploads/
│   │           └── submissions/
│   │
│   ├── AMS.Application/
│   │   ├── Common/
│   │   │   ├── Behaviors/
│   │   │   ├── Exceptions/
│   │   │   ├── Interfaces/
│   │   │   ├── Mappings/
│   │   │   ├── Models/
│   │   │   └── Settings/
│   │   └── Features/
│   │       ├── Admin/
│   │       │   ├── Assignments/
│   │       │   │   ├── DTOs/
│   │       │   │   └── Queries/
│   │       │   │       └── GetAllAssignments/
│   │       │   ├── Classes/
│   │       │   │   ├── Commands/
│   │       │   │   │   ├── CreateClassCommands/
│   │       │   │   │   ├── DeleteClassCommands/
│   │       │   │   │   └── RemoveStudentFromClass/
│   │       │   │   ├── DTOs/
│   │       │   │   └── Queries/
│   │       │   │       ├── GetAllClasses/
│   │       │   │       └── GetStudentsByClass/
│   │       │   ├── Settings/
│   │       │   │   ├── Commands/
│   │       │   │   ├── DTOs/
│   │       │   │   └── Queries/
│   │       │   │       └── GetSettings/
│   │       │   ├── Students/
│   │       │   │   └── Commands/
│   │       │   │       ├── CreateStudent/
│   │       │   │       ├── DeleteStudent/
│   │       │   │       └── UpdateStudent/
│   │       │   ├── Subject/
│   │       │   │   ├── Commands/
│   │       │   │   │   ├── CreateSubject/
│   │       │   │   │   └── DeleteSubject/
│   │       │   │   ├── DTOs/
│   │       │   │   └── Queries/
│   │       │   │       └── GetAllSubjects/
│   │       │   ├── Submissions/
│   │       │   │   ├── DTOs/
│   │       │   │   └── Queries/
│   │       │   │       └── GetAllSubmissions/
│   │       │   ├── Summaries/
│   │       │   │   ├── DTOs/
│   │       │   │   └── Queries/
│   │       │   ├── TeacherAssign/
│   │       │   │   ├── Commands/
│   │       │   │   │   ├── CreateTeacherAssign/
│   │       │   │   │   └── DeleteTeacherAssign/
│   │       │   │   ├── DTOs/
│   │       │   │   └── Queries/
│   │       │   │       └── GetAllTeacherAssign/
│   │       │   ├── Teachers/
│   │       │   │   └── Commands/
│   │       │   │       ├── CreateTeacher/
│   │       │   │       ├── DeleteTeacher/
│   │       │   │       └── UpdateTeacher/
│   │       │   └── Users/
│   │       │       └── Queries/
│   │       │           ├── GetStudents/
│   │       │           └── GetTeachers/
│   │       │
│   │       ├── Assignments/
│   │       │   ├── Commands/
│   │       │   │   ├── CreateAssignment/
│   │       │   │   ├── DeleteAssignment/
│   │       │   │   ├── PublishAssignment/
│   │       │   │   ├── UnpublishAssignment/
│   │       │   │   └── UpdateAssignment/
│   │       │   ├── DTOs/
│   │       │   ├── Queries/
│   │       │   │   ├── GetAllAssignments/
│   │       │   │   ├── GetAssignmentById/
│   │       │   │   ├── GetMyAssignments/
│   │       │   │   ├── GetPublishedAssignments/
│   │       │   │   └── GetStudentAssignments/
│   │       │   └── Validators/
│   │       │
│   │       ├── Authentication/
│   │       │   ├── Commands/
│   │       │   │   ├── Login/
│   │       │   │   ├── RefreshToken/
│   │       │   │   └── Register/
│   │       │   ├── DTOs/
│   │       │   ├── Interfaces/
│   │       │   ├── Responses/
│   │       │   └── Validators/
│   │       │
│   │       ├── Profile/
│   │       │   ├── DTOs/
│   │       │   └── Queries/
│   │       │       └── GetMyProfile/
│   │       │
│   │       ├── Submissions/
│   │       │   ├── Commands/
│   │       │   │   ├── CreateSubmission/
│   │       │   │   ├── GradeSubmission/
│   │       │   │   └── ResubmitSubmission/
│   │       │   ├── DTOs/
│   │       │   └── Queries/
│   │       │       ├── GetAssignmentSubmissions/
│   │       │       ├── GetMySubmissionById/
│   │       │       ├── GetMySubmissions/
│   │       │       └── GetTeacherSubmissions/
│   │       │
│   │       └── Teacher/
│   │           ├── Command/
│   │           ├── DTOs/
│   │           └── Queries/
│   │               └── GetMyTeacherAssign/
│   │
│   ├── AMS.Domain/
│   │   ├── Common/
│   │   ├── Constants/
│   │   ├── Entities/
│   │   └── Enums/
│   │
│   └── AMS.Infrastructure/
│       ├── Identity/
│       ├── Persistence/
│       │   ├── Configurations/
│       │   ├── Context/
│       │   ├── Migrations/
│       │   └── Seed/
│       └── Services/
│
└── tests/
    └── AMS.Tests/
        ├── Assignments/
        ├── Students/
        ├── Submissions/
        └── Teachers/
```
