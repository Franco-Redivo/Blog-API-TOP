# Bloggr - Modern Blog Platform
 
A full-featured blog platform built with React and modern web technologies. This is the frontend client for the Bloggr application.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

## ✨ Features
 
 ### ?? Authentication & User Management
 - User registration and login
 - JWT-based authentication
 - Protected routes
 - User avatars and profiles
 - Secure token management
 
 ### ?? Comments System
 - Add comments to blog posts
 - Delete your own comments
 - Auto-resizing textarea with character limit (200 chars)
 - Real-time comment author fetching
 - Responsive comment layout
 
 ### ?? Modern UI/UX
 - **Tailwind CSS v4** for styling
 - Fully responsive design (mobile-first)
 - Clean, modern interface
 - Loading states and spinners
 - Error handling and validation
 - Smooth animations and transitions
 
 ### ?? Performance
 - **React Query** for efficient data fetching and caching
 - Optimized image loading with random placeholder images
 - Smart pagination for blog posts
 - Lazy loading and code splitting
 
 ## ??? Tech Stack
 
 - **Frontend Framework**: React 19.1.1
 - **Build Tool**: Vite 7.1.7
 - **Styling**: Tailwind CSS v4.1.14
 - **State Management**: React Query (TanStack Query) 5.90.2
 - **Routing**: React Router DOM 7.9.4
 - **HTTP Client**: Axios 1.12.2
 - **Code Quality**: ESLint 9.36.0
 
 ## ?? Project Structure
 
 ```
 src/
 ├── components/          # Reusable UI components
 │   ├── NavBar.jsx      # Navigation bar with user avatar
 │   ├── PostCard.jsx    # Blog post preview cards
 │   ├── Footer.jsx      # Site footer
 │   ├── LoadingSpinner.jsx
 │   └── ProtectedRoute.jsx
 ├── contexts/           # React contexts
 │   └── AuthContext.jsx # Authentication state management
 ├── hooks/              # Custom React hooks
 │   ├── useAuth.js      # Authentication logic
 │   ├── useComments.js  # Comment operations
 │   ├── usePosts.js     # Post operations
 │   └── useUser.js      # User operations
 ├── pages/              # Page components
 │   ├── Login.jsx       # User login
 │   ├── Register.jsx    # User registration
 │   ├── PostsList.jsx   # Blog posts listing
 │   └── PostInfo.jsx    # Individual post view
 ├── services/           # API services
 │   ├── axios.js        # HTTP client configuration
 │   ├── posts.js        # Post API calls
 │   ├── comments.js     # Comment API calls
 │   └── users.js        # User API calls
 ├── utils/              # Utility functions
 │   ├── queryUtils.js   # Data fetching utilities
 │   └── textUtils.js    # Text processing utilities
 └── styles.css          # Global styles and post content styling
 ```
 
 ## ?? Getting Started
 
 ### Prerequisites
 
 - Node.js 18+ and npm
 - Backend API server running on `http://localhost:3000`
 
 ### Installation
 
 1. **Clone the repository**
    ```bash
    git clone https://github.com/Franco-Redivo/Blog-API-TOP.git
    cd Blog-API-TOP/client
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
    Navigate to `http://localhost:5173`
 
 ### Available Scripts
 
 - `npm run dev` - Start development server
 - `npm run build` - Build for production
 - `npm run preview` - Preview production build
 - `npm run lint` - Run ESLint
 
 ## ?? Configuration
 
 ### API Configuration
 The API base URL is configured in `src/services/axios.js`:
 ```javascript
 baseURL: "http://localhost:3000/api"
 ```
 
 ### Authentication
 JWT tokens are stored in `localStorage` and automatically included in API requests.
 
 ## ?? Styling
 
 ### Post Content Styling
 Rich HTML content from TinyMCE is styled using custom CSS classes in `src/styles.css`:
 - Typography (headings, paragraphs, lists)
 - Code blocks and inline code
 - Links and blockquotes
 - Images and tables
 - Responsive design
 
 ### Tailwind Configuration
 - Tailwind CSS v4 with Vite plugin
 - Custom color variables in `:root`
 - Component-specific styling
 - Responsive breakpoints
 
 ## ?? Responsive Design
 
 The application is fully responsive with breakpoints:
 - **Mobile**: < 768px (md)
 - **Tablet**: 768px - 1024px (lg)
 - **Desktop**: > 1024px
 
 Key responsive features:
 - Adaptive post card layouts
 - Mobile-optimized navigation
 - Flexible comment system
 - Responsive typography
 
 ## ?? Key Features in Detail
 
 ### Auto-Resizing Comments
 - Textarea grows automatically as you type
 - Character limit with visual counter
 - Prevents manual resizing
 - Smooth UX with proper validation
 
 ### Smart Post Excerpts  
 - Different text lengths based on screen size
 - HTML content stripped to plain text
 - Proper truncation with ellipsis
 - Responsive image handling
 
 ### User Authentication Flow
 - Login/Register pages
 - Protected route wrapper
 - Automatic token refresh
 - User avatar display in navigation
 
 ## ?? Acknowledgments
 
 - [Tailwind CSS](https://tailwindcss.com/) for the styling framework
 - [React Query](https://tanstack.com/query) for data fetching
 - [Picsum Photos](https://picsum.photos/) for placeholder images
 ---
**Built with ❤️ by [Franco Redivo](https://github.com/Franco-Redivo)**
