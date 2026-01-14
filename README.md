# GigFlow - Freelance Marketplace Platform

A modern, full-stack freelance marketplace where clients post gigs and freelancers submit bids. Built with the MERN stack (MongoDB, Express, React, Node.js) featuring real-time notifications, dark mode, and atomic transaction handling.

![GigFlow](https://img.shields.io/badge/Status-Production%20Ready-success)
![Node](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7+-brightgreen)

## ✨ Features

### Core Functionality
- 🔐 **JWT Authentication** - Secure login/register with HttpOnly cookies
- 📝 **Gig Management** - Post, browse, and search for freelance jobs
- 💰 **Bidding System** - Submit proposals with custom pricing
- ✅ **Atomic Hiring** - MongoDB transactions prevent race conditions
- 🔔 **Real-time Notifications** - Socket.io instant hire alerts
- 🌙 **Dark Mode** - System preference detection with manual toggle
- 📱 **Fully Responsive** - Works on mobile, tablet, and desktop

### User Roles
- **Clients**: Post gigs, review bids, hire freelancers
- **Freelancers**: Browse jobs, submit bids, receive hire notifications

---

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express** - RESTful API
- **MongoDB** + **Mongoose** - Database with transactions
- **JWT** - Authentication with HttpOnly cookies
- **Socket.io** - WebSocket for real-time events
- **Bcrypt** - Password hashing

### Frontend
- **React** 18 + **Vite** - Fast development and builds
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **Socket.io-client** - Real-time connection

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ ([Download](https://nodejs.org/))
- MongoDB v7+ ([Download](https://www.mongodb.com/try/download/community))
- Git

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Sid-chou/gig_freelance.git
cd gig_freelance
```

**2. Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/gigflow
JWT_SECRET=your_super_secret_key_change_this_in_production
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**3. Frontend Setup**
```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

**4. Start MongoDB**
```bash
# Windows (if installed as service)
net start MongoDB

# macOS/Linux
mongod --dbpath /path/to/data/db
```

**5. Run the Application**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

**6. Access the App**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## 📖 Usage Guide

### Testing the Complete Flow

**Scenario: Client hires a Freelancer**

1. **Register Two Users**
   - User A (Client): `client@example.com`
   - User B (Freelancer): `freelancer@example.com`

2. **Client Posts a Gig** (User A)
   - Login as client@example.com
   - Click "Post Gig"
   - Fill: Title, Description, Budget
   - Submit

3. **Freelancer Submits Bid** (User B)
   - Login as freelancer@example.com
   - Browse gigs → Click on the posted gig
   - Click "Place a Bid"
   - Enter proposal message and price
   - Submit

4. **Client Hires Freelancer** (User A)
   - Go to "My Gigs"
   - Click on gig → View bids
   - Click "Hire This Freelancer"
   - Confirm

5. **Freelancer Receives Real-time Notification** (User B)
   - 🔔 Toast notification appears instantly!
   - Shows congratulations message with gig details

---

## 🏗️ Project Structure

```
gig_freelance/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   ├── gigController.js      # Gig CRUD
│   │   └── bidController.js      # Bid + Hire logic
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── errorMiddleware.js    # Error handler
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Gig.js                # Gig schema
│   │   └── Bid.js                # Bid schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── gigRoutes.js
│   │   └── bidRoutes.js
│   ├── utils/
│   │   └── generateToken.js      # JWT helper
│   ├── .env.example
│   ├── server.js                 # Entry point + Socket.io
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── NotificationToast.jsx
    │   ├── context/
    │   │   └── ThemeContext.jsx   # Dark mode
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx       # Browse gigs
    │   │   ├── PostGig.jsx
    │   │   ├── GigDetails.jsx      # View + Bid
    │   │   ├── MyGigs.jsx
    │   │   └── MyBids.jsx
    │   ├── services/
    │   │   ├── api.js             # Axios instance
    │   │   └── socket.js          # Socket.io client
    │   ├── store/
    │   │   ├── store.js           # Redux store
    │   │   ├── authSlice.js
    │   │   ├── gigSlice.js
    │   │   └── bidSlice.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env.example
    ├── tailwind.config.js
    └── package.json
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Gigs
- `GET /api/gigs` - Get all open gigs (with search)
- `GET /api/gigs/:id` - Get single gig
- `POST /api/gigs` - Create gig (protected)
- `GET /api/gigs/my-gigs` - Get user's posted gigs (protected)

### Bids
- `POST /api/bids` - Submit bid (protected)
- `GET /api/bids/:gigId` - Get bids for gig (owner only)
- `GET /api/bids/my-bids` - Get user's bids (protected)
- `PATCH /api/bids/:bidId/hire` - Hire freelancer (protected, atomic)

---

## 🔒 Security Features

- ✅ **JWT in HttpOnly Cookies** - XSS protection
- ✅ **Password Hashing** - Bcrypt with salt
- ✅ **CORS Configuration** - Whitelist client origin
- ✅ **MongoDB Transactions** - Atomic operations
- ✅ **Input Validation** - Mongoose schema validation
- ✅ **Protected Routes** - Auth middleware

---

## 🎯 Key Implementation Highlights

### 1. Atomic Hiring with MongoDB Transactions
```javascript
// Prevents race conditions when multiple clients try to hire simultaneously
const session = await mongoose.startSession();
session.startTransaction();

try {
  // Update gig, hired bid, and reject other bids atomically
  await Gig.findByIdAndUpdate(gigId, { status: 'assigned' }, { session });
  await Bid.findByIdAndUpdate(bidId, { status: 'hired' }, { session });
  await Bid.updateMany({ gigId, _id: { $ne: bidId } }, 
    { status: 'rejected' }, { session });
  
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
}
```

### 2. Real-time Notifications with Socket.io
```javascript
// Backend emits notification
io.to(freelancerId).emit('hire-notification', {
  message: "You've been hired!",
  gig: { title, budget },
  timestamp: new Date()
});

// Frontend listens
socket.on('hire-notification', (notification) => {
  // Display toast notification
});
```

### 3. Dark Mode with System Preference
```javascript
// Detects system preference, persists user choice in localStorage
const [isDark, setIsDark] = useState(() => {
  const saved = localStorage.getItem('theme');
  return saved ? saved === 'dark' : 
    window.matchMedia('(prefers-color-scheme: dark)').matches;
});
```

---

## 🚢 Deployment

### Backend Deployment (Render/Railway)

**Option 1: Render**
1. Push code to GitHub
2. Create account on [Render](https://render.com)
3. New Web Service → Connect repository
4. Build Command: `cd backend && npm install`
5. Start Command: `node backend/server.js`
6. Add environment variables (MongoDB Atlas URI, JWT_SECRET, etc.)

**Option 2: Railway**
1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Deploy: `railway up`
4. Add environment variables in dashboard

### Frontend Deployment (Vercel/Netlify)

**Option 1: Vercel**
```bash
cd frontend
npm install -g vercel
vercel
# Follow prompts, add VITE_API_URL env variable
```

**Option 2: Netlify**
1. Build: `npm run build`
2. Deploy `dist` folder to Netlify
3. Add environment variables in dashboard

### Database (MongoDB Atlas - Free Tier)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Set up database access (username/password)
4. Whitelist IP (0.0.0.0/0 for development)
5. Get connection string
6. Update MONGO_URI in backend .env

---

## 🧪 Testing

Run the application locally and test:

- ✅ User registration and login
- ✅ JWT cookie authentication
- ✅ Post a gig as client
- ✅ Browse and search gigs
- ✅ Submit bid as freelancer
- ✅ View bids as gig owner
- ✅ **Hire freelancer** (atomic transaction)
- ✅ **Real-time notification** on hire
- ✅ Dark mode toggle
- ✅ Responsive design on mobile

---

## 📹 Demo Video

Record a 2-minute [Loom](https://www.loom.com/) video demonstrating:
1. Registration/Login
2. Posting a gig
3. Submitting a bid
4. **Hiring flow** (show atomic updates)
5. **Real-time notification** (open two browsers)

---

## 📝 Submission Checklist

- [ ] Code pushed to GitHub
- [ ] README.md completed
- [ ] .env.example files created
- [ ] Backend deployed (Render/Railway)
- [ ] Frontend deployed (Vercel/Netlify)
- [ ] MongoDB Atlas configured
- [ ] 2-minute Loom video recorded
- [ ] Email sent to: hiring@servicehive.tech

**Submission Email Template:**
```
Subject: GigFlow - Freelance Marketplace Submission

Repository: https://github.com/Sid-chou/gig_freelance
Live Demo: [Your deployed URL]
Video Demo: [Your Loom link]

Features Implemented:
✅ User Authentication (JWT + Cookies)
✅ Gig Management (CRUD)
✅ Bidding System
✅ Atomic Hiring Logic (MongoDB Transactions)
✅ Real-time Notifications (Socket.io)
✅ Dark Mode
✅ Responsive Design

Thank you!
[Your Name]
```

---

## 🤝 Contributing

This project is for educational/assessment purposes. For any questions:
- Email: [your-email]
- GitHub: [@Sid-chou](https://github.com/Sid-chou)

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

Built as part of a full-stack development assessment showcasing:
- Modern MERN stack development
- Real-time communication with WebSockets
- Transaction handling for data integrity
- Production-ready authentication
- Premium UI/UX design

---

**Made with ❤️ by Siddharth**
