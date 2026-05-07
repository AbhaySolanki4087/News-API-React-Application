# Authentication & Session Setup - Complete Guide

## Overview
Your application now has a complete session-based authentication system with JWT tokens, proper error handling, user state management, and protected routes.

## What's Fixed ✅

### Backend Improvements:
1. **Session Management** - Express sessions configured for persistent user sessions
2. **Proper JWT Format** - Tokens now sent with "Bearer " prefix
3. **Auth Middleware** - Fixed to properly extract and validate Bearer tokens
4. **Logout Endpoint** - New POST `/api/auth/logout` endpoint
5. **Current User Endpoint** - Protected GET `/api/auth/me` endpoint
6. **CORS with Credentials** - Configured to support cookies/sessions across domains
7. **Better Error Messages** - Detailed, user-friendly error responses
8. **Input Validation** - Email, password strength, and required field validation

### Frontend Improvements:
1. **Auth Context** - Global user state management
2. **useAuth Hook** - Easy access to auth state and functions
3. **Protected Routes** - Routes require authentication
4. **Login/Register Forms** - Complete with error/success messages, loading states
5. **Navbar** - Shows user info when logged in, logout button
6. **Redirect on Login** - Automatically redirects to home after successful login
7. **Session Persistence** - User stays logged in after page refresh

## Environment Setup

### Backend (.env file):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/news-app
JWT_SECRET=your-secret-key-change-this-in-production
SESSION_SECRET=your-session-secret-change-this-in-production
```

### Install Dependencies:
```bash
# Backend
cd Backend
npm install

# Frontend
cd my-news
npm install
```

## API Endpoints

### Authentication Routes:
```
POST /api/auth/register - Register new user
Body: { name, email, password }
Response: { message, user: { id, name, email } }

POST /api/auth/login - Login user
Body: { email, password }
Response: { message, token, user: { id, name, email } }

POST /api/auth/logout - Logout user
Response: { message }

GET /api/auth/me - Get current user (requires auth)
Headers: Authorization: Bearer <token>
Response: User object (without password)
```

## User Flow

### Registration:
1. User fills out form with name, email, password, confirm password
2. Frontend validates inputs (password length, matching passwords)
3. Sends to `/api/auth/register`
4. On success, redirects to login page
5. On error, shows error message

### Login:
1. User enters email and password
2. Sends to `/api/auth/login`
3. Backend validates credentials and creates session
4. Returns JWT token and user info
5. Frontend saves token and user to localStorage
6. User state updated in AuthContext
7. Redirects to home page (protected route)

### Protected Routes:
1. Routes like `/`, `/articles`, etc. are now protected
2. Require valid token in Authorization header
3. If not authenticated, redirects to `/login`

### Logout:
1. Click logout button in navbar
2. Calls `/api/auth/logout`
3. Session destroyed on backend
4. Token and user removed from localStorage
5. AuthContext updated
6. Redirects to login page

## How to Use in Components

### Access Auth State:
```javascript
import { useAuth } from "../hooks/useAuth";

export default function MyComponent() {
  const { isAuthenticated, user, token, login, logout } = useAuth();

  return (
    <>
      {isAuthenticated && <p>Welcome, {user.name}!</p>}
    </>
  );
}
```

### Make Protected API Calls:
```javascript
import { getAuthHeader } from "../services/api";

const response = await fetch("/api/protected-endpoint", {
  headers: {
    ...getAuthHeader(),
    "Content-Type": "application/json",
  },
});
```

## Testing the System

### Test Registration:
1. Go to `http://localhost:5173/register`
2. Fill in name, email, password (min 6 chars)
3. Confirm password must match
4. Click Register
5. Should show success and redirect to login

### Test Login:
1. Go to `http://localhost:5173/login`
2. Enter registered email and password
3. Click Login
4. Should show success and redirect to home
5. Navbar should show user name and logout button

### Test Protected Routes:
1. Try accessing `http://localhost:5173/` when not logged in
2. Should redirect to `/login`
3. After login, should be able to access all routes

### Test Logout:
1. Click logout button in navbar
2. Should redirect to login
3. Trying to access protected routes should redirect to login

### Test Session Persistence:
1. Login to the app
2. Refresh the page
3. User should still be logged in
4. Close browser and reopen - user should still be logged in (token in localStorage)

## Security Notes

1. **HTTPS in Production** - Set `secure: true` in session cookie config
2. **Strong Secrets** - Change JWT_SECRET and SESSION_SECRET in production
3. **Token Expiration** - Currently set to 24 hours, adjust as needed
4. **Password Hashing** - Using bcrypt with salt 10 rounds
5. **Input Validation** - All inputs validated on both frontend and backend
6. **Protected Routes** - All sensitive routes require authentication

## Troubleshooting

### "Invalid token" error:
- Check if token format is "Bearer <token>"
- Verify JWT_SECRET matches between login and protected endpoint calls
- Check if token is expired (24 hour expiration)

### User not persisting after refresh:
- Check if localStorage is enabled
- Verify token is being saved correctly

### CORS errors:
- Check if origin matches: http://localhost:5173
- Verify credentials: true is set in CORS config
- Check if credentials header is being sent

### Session not working:
- Install express-session: `npm install express-session`
- Verify SESSION_SECRET is set in .env
- Check if cookies are enabled in browser

## File Structure

New files created:
```
my-news/
├── src/
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   └── components/
│       └── ProtectedRoute.jsx
```

Modified files:
```
Backend/
├── service.js (session middleware)
├── package.json (express-session added)
├── controllers/authController.js (logout, getCurrentUser)
├── middleware/authMiddleware.js (Bearer token handling)
└── routes/authRoutes.js (new endpoints)

my-news/
├── src/
│   ├── App.jsx (AuthProvider, ProtectedRoute)
│   ├── services/api.js (credentials, auth headers)
│   ├── Components/
│   │   ├── User Activity/Login.jsx (error handling, redirect)
│   │   ├── User Activity/Register.jsx (validation, redirect)
│   │   └── CommonFiles/Navbar.jsx (user info, logout)
```

## Next Steps

1. Install dependencies: `npm install` in both Backend and my-news folders
2. Create .env file in Backend with your MongoDB URI
3. Run backend: `node service.js`
4. Run frontend: `npm run dev`
5. Test the complete flow!
