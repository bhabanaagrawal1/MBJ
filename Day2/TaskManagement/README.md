# Task Management REST API

A RESTful Task Management API built using **Node.js, Express.js, MongoDB, and Mongoose**. It provides functionality for managing personal tasks, including CRUD operations, filtering, sorting, pagination, and task statistics.

The application also implements simple JWT-based authentication to ensure users can securely manage their own tasks.

## Features

### 1. Task Management
- Create new tasks.
- Retrieve all tasks belonging to the authenticated user.
- Retrieve an individual task by ID.
- Update existing tasks.
- Delete tasks.
- Associate every task with its respective owner.

### 2. Task Status & Priority

Each task supports three statuses:
- `PENDING`
- `IN_PROGRESS`
- `COMPLETED`

Each task also supports three priority levels:
- `LOW`
- `MEDIUM`
- `HIGH`

Tasks can include a title, description, priority, status, and deadline.

### 3. Filtering, Sorting & Pagination

**Filtering**
- Filter tasks by status.
- Filter tasks by priority.
- Combine multiple filters in a single request.

**Sorting**
- Sort tasks by fields such as deadline, creation date, title, priority, or status.
- Support ascending and descending order.

**Pagination**
- Retrieve tasks page by page.
- Configure the number of tasks per page.
- Return pagination metadata, including current page, total tasks, and total pages.

Example:

```http
GET /api/tasks?status=PENDING&priority=HIGH&page=1&limit=10&sortBy=deadline&order=asc
```

### 4. Task Statistics

Provides an overview of a user's tasks through a dedicated statistics endpoint.

Statistics include:
- Total number of tasks.
- Pending tasks.
- In-progress tasks.
- Completed tasks.
- High-priority tasks.
- Medium-priority tasks.
- Low-priority tasks.
- Overdue tasks.

**Implementation:** Uses the MongoDB aggregation pipeline with operators such as `$match`, `$group`, `$sum`, `$cond`, and `$and` to calculate multiple statistics in a single database query.

### 5. Simple Authentication
- User registration and login.
- Password hashing using bcrypt.
- JWT-based authentication.
- Authentication middleware for protected routes.
- User-specific task access.

### 6. Validation & Error Handling
- Request validation using Zod.
- Centralized error-handling middleware.
- Consistent API error responses.
- Handling duplicate email registration.

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| bcrypt | Password hashing |
| JSON Web Token | Authentication |
| Zod | Request validation |
| dotenv | Environment variable management |
| Nodemon | Development server |

## Project Structure

```text
TaskManagement/
│
├── src/
│   ├── config/
│   │   ├── config.js
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── task.controller.js
│   │
│   ├── middleware/
│   │   ├── auth-validate-login.js
│   │   ├── auth-validate-register.js
│   │   ├── authenticate.js
│   │   ├── errorHandling.js
│   │   ├── task.validation.js
│   │   └── validate.middleware.js
│   │
│   ├── models/
│   │   ├── task.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── task.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   └── task.service.js
│   │
│   ├── utils/
│   │   ├── api-error.js
│   │   └── generate-token.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd TaskManagement
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory.

```env
PORT=3000
NODE_ENV=development

DATABASE_URI=mongodb://127.0.0.1:27017/task_management

JWT_SECRET=your_strong_secret_key
JWT_EXPIRES_IN=1d
```

Replace the database URI and JWT secret with your own configuration.

### 4. Start the development server

```bash
npm run dev
```

To start the application:

```bash
npm start
```

The server will run at:

```text
http://localhost:3000
```

## API Documentation

Base URL:

```text
http://localhost:3000/api
```

### Authentication Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login an existing user |

### Task Routes

All task routes require JWT authentication.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/tasks` | Create a new task |
| GET | `/tasks` | Retrieve tasks with filtering, sorting, and pagination |
| GET | `/tasks/:id` | Retrieve a specific task |
| PATCH | `/tasks/:id` | Update an existing task |
| DELETE | `/tasks/:id` | Delete a task |
| GET | `/tasks/stats` | Retrieve task statistics |

## Authentication

Protected endpoints require a valid JWT access token.

Include the token in the request header:

```http
Authorization: Bearer <your_access_token>
```

## Example API Requests

### Register a User

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPassword@123"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "john@example.com",
  "password": "StrongPassword@123"
}
```

### Create a Task

```http
POST /api/tasks
Authorization: Bearer <your_access_token>
Content-Type: application/json
```

```json
{
  "title": "Complete backend project",
  "description": "Finish the Task Management REST API",
  "priority": "HIGH",
  "status": "PENDING",
  "deadline": "2026-12-20T18:00:00.000Z"
}
```

### Update a Task

```http
PATCH /api/tasks/:id
Authorization: Bearer <your_access_token>
Content-Type: application/json
```

```json
{
  "status": "IN_PROGRESS"
}
```

### Retrieve Task Statistics

```http
GET /api/tasks/stats
Authorization: Bearer <your_access_token>
```

## Error Response Format

The API uses centralized error handling to maintain a consistent response structure.

Example:

```json
{
  "success": false,
  "message": "Task not found"
}
```

### Common HTTP Status Codes

| Status Code | Meaning |
|---|---|
| `200` | Request successful |
| `201` | Resource created |
| `400` | Bad request or validation error |
| `401` | Unauthorized |
| `404` | Resource not found |
| `409` | Resource conflict |
| `500` | Internal server error |