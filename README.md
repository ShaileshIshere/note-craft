# NoteCraft - Modern Blogging Platform

A full-stack blogging platform built with React, TypeScript, and Hono, featuring a beautiful UI, authentication system, and seamless content management.

![NoteCraft Banner](client/public/notecraft-logo.png)

## 🚀 Features

### ✨ Core Features
- **User Authentication** - Secure signup/signin with JWT tokens
- **Rich Text Editor** - Create and publish blog posts with ease
- **Image Upload** - Support for blog post thumbnails and images
- **Category System** - Organize posts by categories (Technology, Business, Health, etc.)
- **Featured Articles** - Highlight important content with featured badges
- **Responsive Design** - Beautiful UI that works on all devices

### 🎨 UI/UX Features
- **Modern Design** - Clean, professional interface
- **Framer Motion Animations** - Smooth transitions and micro-interactions
- **Featured Slider** - Interactive carousel for showcasing top articles
- **Creative Loaders** - Beautiful loading animations throughout the app
- **Toast Notifications** - User-friendly feedback system
- **Dark Mode Support** - (Coming soon)

### 🔧 Technical Features
- **TypeScript** - Full type safety across the stack
- **State Management** - Recoil for global state management
- **API Integration** - RESTful API with proper error handling
- **Route Protection** - Secure routes requiring authentication
- **Form Validation** - Client-side validation for better UX
- **Code Splitting** - Optimized bundle loading

## 📸 Screenshots

### Home Page
![Home Page](client/public/homepage.png)
*Clean and modern homepage with featured articles carousel*

### Authentication
![Signin Page](client/public/signin.png)
*Beautiful authentication forms with smooth animations*

![Signup Page](client/public/signup.png)
*User-friendly registration process*

### Blog Management
![Publish Post](client/public/publish.png)
*Rich editor for creating and publishing blog posts*

![Blog Feed](client/public/blogs.png)
*Organized blog feed with category filtering*

### Individual Blog Post
![Blog Post](client/public/blog-post.png)
*Clean reading experience with author information*

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Recoil** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons

### Backend
- **Hono** - Lightweight web framework
- **TypeScript** - Type-safe backend development
- **JWT** - Authentication tokens
- **Prisma ORM** - Database management
- **PostgreSQL** - Primary database
- **Cloudflare Workers** - Serverless deployment

## 📁 Project Structure

```
medium/
├── client/                 # Frontend React application
│   ├── public/            # Static assets and screenshots
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Appbar.tsx
│   │   │   ├── Auth.tsx
│   │   │   ├── AuthLoader.tsx
│   │   │   ├── BlogCard.tsx
│   │   │   ├── FeaturedSlider.tsx
│   │   │   ├── ImageUpload.tsx
│   │   │   └── PublishButton.tsx
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   │   ├── Blog.tsx
│   │   │   ├── Blogs.tsx
│   │   │   ├── Publish.tsx
│   │   │   ├── Signin.tsx
│   │   │   └── Signup.tsx
│   │   ├── store/         # Recoil state management
│   │   └── config/        # Configuration files
│   ├── package.json
│   └── tailwind.config.js
├── backend/               # Backend Hono application
│   ├── src/
│   │   ├── routes/       # API route handlers
│   │   ├── middleware/   # Authentication middleware
│   │   └── index.ts      # Main server file
│   ├── prisma/          # Database schema and migrations
│   └── package.json
├── common/              # Shared types and utilities
│   ├── src/
│   │   └── index.ts     # Shared TypeScript types
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- Cloudflare account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NoteCraft
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../client
   npm install
   
   # Install common package dependencies
   cd ../common
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` files in both client and backend directories:
   
   **Backend (.env)**
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/notecraft"
   JWT_SECRET="your-jwt-secret-key"
   ```
   
   **Client (.env)**
   ```env
   VITE_BACKEND_URL="http://localhost:8787"
   ```

4. **Database Setup**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start Development Servers**
   
   **Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend:**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8787`

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/v1/user/signup     # User registration
POST /api/v1/user/signin     # User login
```

### Blog Endpoints
```
GET  /api/v1/blog           # Get all blogs
GET  /api/v1/blog/:id       # Get specific blog
POST /api/v1/blog           # Create new blog
PUT  /api/v1/blog/:id       # Update blog
```

### Request/Response Examples

**Create Blog Post**
```json
POST /api/v1/blog
{
  "title": "My Amazing Blog Post",
  "content": "This is the content of my blog post...",
  "imageUrl": "https://example.com/image.jpg",
  "category": "Technology",
  "published": true
}
```

## 🎨 Component Features

### Featured Slider
- Interactive carousel with smooth animations
- Auto-play functionality with pause on hover
- Responsive design with touch/swipe support
- Preview thumbnails for easy navigation

### Authentication System
- Beautiful animated forms
- Real-time validation
- Creative loading animations
- Secure JWT token management

### Rich Text Editor
- WYSIWYG editing experience
- Image upload integration
- Category selection
- Auto-save functionality

### Blog Cards
- Clean, card-based layout
- Author information display
- Read time estimation
- Category badges

## 🔧 Development

### Available Scripts

**Frontend (client/)**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

**Backend (backend/)**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run deploy       # Deploy to Cloudflare Workers
```

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Consistent component structure

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect your repository
2. Set environment variables
3. Deploy automatically on push

### Backend (Cloudflare Workers)
```bash
cd backend
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Hono Framework** - Lightweight and fast web framework
- **Prisma** - Next-generation ORM
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Lucide Icons** - Beautiful icon library

---

**Made with ❤️ by Shailesh Kandari**
