# GigFlow - Freelance Marketplace Platform

A modern full-stack freelance marketplace where clients can post jobs (gigs) and freelancers can submit bids and get hired.

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT with HttpOnly cookies
- **Security**: bcryptjs, CORS

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **HTTP Client**: Axios

## 📁 Project Structure

```
gig-freelance/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth & error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   └── server.js        # Entry point
└── frontend/
    └── src/
        ├── components/  # Reusable components
        ├── pages/       # Page components
        ├── store/       # Redux slices
        ├── services/    # API client
        └── utils/       # Helper functions
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

4. Run the server:
```bash
# Development
npm run dev

# Production
npm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Run the development server:
```bash
npm run dev
```

## 🔑 Core Features

- **User Authentication**: Secure sign-up and login with JWT
- **Fluid Roles**: Users can be both clients and freelancers
- **Gig Management**: Post, browse, and search jobs
- **Bidding System**: Freelancers can bid on open gigs
- **Atomic Hiring**: Race-condition-proof hiring logic using MongoDB transactions

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Gigs
- `GET /api/gigs` - Get all open gigs (with search)
- `GET /api/gigs/:id` - Get single gig
- `POST /api/gigs` - Create new gig (protected)
- `GET /api/gigs/my-gigs` - Get user's posted gigs (protected)

### Bids
- `POST /api/bids` - Submit a bid (protected)
- `GET /api/bids/:gigId` - Get all bids for a gig (owner only)
- `GET /api/bids/my-bids` - Get user's submitted bids (protected)
- `PATCH /api/bids/:bidId/hire` - Hire a freelancer (owner only)

## 🎯 Hiring Logic (Crucial Feature)

The hire endpoint implements atomic operations using MongoDB transactions:

1. ✅ Gig status changes from `open` to `assigned`
2. ✅ Selected bid status changes to `hired`
3. ✅ All other bids for that gig are marked as `rejected`
4. ✅ Prevents race conditions if multiple admins try to hire simultaneously

## 🔐 Security Features

- Password hashing with bcrypt
- JWT tokens in HttpOnly cookies (XSS protection)
- CORS configuration
- Input validation
- Protected routes with authentication middleware

## 📝 License

ISC
