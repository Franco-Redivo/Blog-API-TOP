# Bloggr - Author Dashboard

A modern, responsive blog author dashboard built with React 19, allowing authors to create, edit, and manage their blog posts with a rich text editing experience.

![React](https://img.shields.io/badge/React-19.1.1-blue.svg)
![Vite](https://img.shields.io/badge/Vite-Latest-purple.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-blue.svg)
![React Query](https://img.shields.io/badge/React%20Query-5.90.2-red.svg)

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with secure token management
- **Protected routes** - unauthorized users are redirected to login
- **User context** with automatic token refresh and logout
- **Login/Registration** forms with error handling

### 📝 Post Management
- **Rich text editor** powered by TinyMCE
- **CRUD operations** - Create, Read, Update, Delete posts
- **Draft/Publish toggle** - Manage post publication status
- **Real-time updates** with React Query optimization
- **Client-side sorting** to maintain consistent post order

### 📱 Responsive Design
- **Mobile-first approach** with breakpoint at 640px
- **Adaptive table layout** - Card view on mobile, table view on desktop
- **Touch-friendly interfaces** optimized for mobile interactions
- **Pagination system** to handle large numbers of posts
- **Responsive text sizing** and spacing for all screen sizes

### 🚀 Performance & UX
- **Optimistic updates** for instant UI feedback
- **Smart caching** with React Query for reduced API calls
- **Loading states** and error boundaries
- **Smooth navigation** with React Router

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite
- **Routing**: React Router DOM 7.9.3
- **State Management**: React Query (TanStack Query) 5.90.2
- **Styling**: Tailwind CSS 4.1.14
- **Rich Text Editor**: TinyMCE 6.3.0
- **HTTP Client**: Axios 1.12.2
- **Authentication**: JWT tokens with localStorage persistence

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Backend API** running on `http://localhost:3000` (see server documentation)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Franco-Redivo/Blog-API-TOP.git
   cd Blog-API-TOP/client-author
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
client-author/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Dashboard.jsx    # Main posts dashboard with table/card views
│   │   ├── Modal.jsx        # Modal component for forms
│   │   ├── NavBar.jsx       # Navigation with user info and logout
│   │   ├── LoadingSpinner.jsx
│   │   └── ProtectedRoute.jsx
│   ├── contexts/           # React contexts
│   │   └── AuthContext.jsx # Authentication state management
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.js     # Authentication hook
│   │   ├── usePosts.js    # Posts CRUD hooks with React Query
│   │   └── useUser.js     # User login/registration hooks
│   ├── pages/             # Page components
│   │   ├── PostsDashboard.jsx  # Main dashboard page
│   │   ├── Login.jsx      # Login form
│   │   └── Register.jsx   # Registration form
│   ├── services/          # API communication
│   │   ├── axios.js       # Configured axios instance with interceptors
│   │   ├── posts.js       # Posts API calls
│   │   └── users.js       # Authentication API calls
│   ├── utils/             # Utility functions
│   ├── App.jsx           # Main app component with routing
│   └── main.jsx          # App entry point
├── public/               # Static assets
└── package.json         # Dependencies and scripts
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint for code quality checks
```

## 🌐 API Integration

The application connects to a RESTful backend API with the following endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Posts
- `GET /api/posts` - Get all user posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update existing post
- `DELETE /api/posts/:id` - Delete post

**Note**: All post operations require JWT authentication via Authorization header.

## 📱 Responsive Features

### Desktop Experience (≥640px)
- **Full table layout** with sortable columns
- **Detailed pagination** with page numbers and result counts
- **Larger text sizes** and comfortable spacing
- **Hover effects** and enhanced interactions

### Mobile Experience (<640px)
- **Card-based layout** replacing table structure
- **Compact pagination** with Prev/Next buttons
- **Abbreviated text** ("Pub" instead of "Published")
- **Touch-optimized** buttons and spacing
- **Text truncation** for long titles with proper ellipsis

## 🔐 Authentication Flow

1. **Unauthenticated users** are redirected to `/login`
2. **Successful login** stores JWT token in localStorage
3. **Token is automatically** included in API requests via Axios interceptors
4. **Token expiration** triggers automatic logout
5. **Protected routes** verify authentication status before rendering

## 💾 State Management

### React Query (TanStack Query)
- **Automatic caching** with 5-minute stale time
- **Background refetching** to keep data fresh
- **Optimistic updates** for immediate UI feedback
- **Error boundaries** and retry logic
- **Cache invalidation** on mutations

### Authentication Context
- **Global user state** accessible throughout the app
- **JWT token management** with automatic persistence
- **Login/logout functions** with proper cleanup
- **Loading states** during authentication checks

## 🎨 Styling Approach

### Tailwind CSS
- **Utility-first** CSS framework for rapid development
- **Responsive design** with mobile-first approach
- **Custom CSS variables** for theme consistency
- **Component-based** styling patterns

### Design System
- **Consistent spacing** using Tailwind's spacing scale
- **Typography hierarchy** with responsive text sizing
- **Color palette** with semantic naming
- **Interactive states** with hover and focus effects

## 🔄 Data Flow

1. **User actions** trigger React Query mutations
2. **Optimistic updates** provide instant UI feedback
3. **API calls** are made with proper error handling
4. **Cache invalidation** ensures data consistency
5. **UI updates** reflect the latest state automatically

## 🐛 Error Handling

- **API errors** are caught and displayed to users
- **Network failures** trigger retry mechanisms
- **Form validation** prevents invalid submissions
- **Authentication errors** redirect to login page
- **Loading states** provide user feedback during operations

## 🚀 Performance Optimizations

- **Code splitting** with React.lazy for route-based splitting
- **Memoization** with useMemo and useCallback where appropriate
- **React Query caching** reduces unnecessary API calls
- **Optimistic updates** improve perceived performance
- **Efficient re-renders** with proper dependency arrays

## 🔮 Future Enhancements

- [ ] **Server-side pagination** for better performance with large datasets
- [ ] **Search and filtering** capabilities in the dashboard
- [ ] **Bulk operations** for managing multiple posts
- [ ] **Image upload** integration for post content
- [ ] **Auto-save** functionality for draft posts
- [ ] **Keyboard shortcuts** for power users
- [ ] **Dark mode** theme toggle

## 👨‍💻 Developer

**Franco Redivo**
- GitHub: [@Franco-Redivo](https://github.com/Franco-Redivo)

