# Blog API

A RESTful blog API built with Node.js, Express, and Prisma. This API provides full CRUD operations for users, posts, and comments with JWT authentication.

## Features

- **User Management**: Registration, login, and user profile management
- **Authentication**: JWT-based authentication with role-based access control
- **Posts**: Create, read, update, and delete blog posts
- **Comments**: Add and manage comments on posts
- **Role-based Authorization**: USER and ADMIN roles with different permissions
- **Database**: PostgreSQL with Prisma ORM
- **Security**: Password hashing with bcrypt, CORS enabled

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **Validation**: express-validator

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Franco-Redivo/Blog-API-TOP.git
   cd Blog-API-TOP/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/blog_db"
   ACCESS_TOKEN_SECRET="your-super-secret-jwt-key"
   SALT_ROUNDS=10
   PORT=3000
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate deploy
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Get all users | Yes |
| GET | `/api/users/:id` | Get user by ID | Yes |
| PUT | `/api/users/:id` | Update user | Yes (Owner/Admin) |
| DELETE | `/api/users/:id` | Delete user | Yes (Owner/Admin) |

### Posts

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/posts` | Get all posts | No |
| GET | `/api/posts/:id` | Get post by ID | No |
| POST | `/api/posts` | Create new post | Yes |
| PUT | `/api/posts/:id` | Update post | Yes (Owner/Admin) |
| DELETE | `/api/posts/:id` | Delete post | Yes (Owner/Admin) |

### Comments

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/posts/:postId/comments` | Get comments for a post | No |
| POST | `/api/posts/:postId/comments` | Add comment to post | Yes |
| PUT | `/api/comments/:id` | Update comment | Yes (Owner/Admin) |
| DELETE | `/api/comments/:id` | Delete comment | Yes (Owner/Admin) |

## Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Login User
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}

# Response
{
  "accessToken": "jwt.token.here"
}
```

### Create Post
```bash
POST /api/posts
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "My First Post",
  "body": "This is the content of my first post...",
  "published": true
}
```

### Add Comment
```bash
POST /api/posts/123/comments
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "content": "Great post! Thanks for sharing."
}
```

## Authentication

This API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Register or login to get an access token
2. Include the token in the Authorization header:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

## Database Schema

### User
- `id`: UUID (Primary Key)
- `name`: String
- `email`: String (Unique)
- `password`: String (Hashed)
- `role`: Enum (USER, ADMIN)

### Post
- `id`: UUID (Primary Key)
- `title`: String
- `body`: String
- `authorId`: String (Foreign Key)
- `published`: Boolean
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Comment
- `id`: UUID (Primary Key)
- `content`: String
- `userId`: String (Foreign Key)
- `postId`: String (Foreign Key)
- `createdAt`: DateTime

## Development

### Database Operations
```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# Generate new migration
npx prisma migrate dev --name migration-name
```

### Project Structure
```
src/
├── controllers/          # Route handlers
│   ├── authController.js
│   ├── postController.js
│   ├── userController.js
│   └── commentController.js
├── models/              # Database queries and mutations
│   ├── client.js
│   ├── mutations.js
│   ├── userQueries.js
│   ├── postQueries.js
│   └── commentQueries.js
├── routes/              # API routes
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── postRoutes.js
├── middlewares/         # Custom middleware
│   └── authMiddleware.js
└── app.js              # Express app setup
```

## Contact

Franco Redivo - [GitHub](https://github.com/Franco-Redivo)

Project Link: [https://github.com/Franco-Redivo/Blog-API-TOP](https://github.com/Franco-Redivo/Blog-API-TOP)
