# 🚗 Uber Clone - MERN Stack Ride-Sharing Application

A full-stack ride-sharing application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that replicates core Uber functionality. Features user authentication, real-time location tracking, ride booking, and driver-passenger matching.

## 🚀 Features

### ✅ Implemented
- **User Authentication System**
  - User registration with validation
  - JWT token-based authentication
  - Password hashing with bcrypt
  - User profile management

- **Backend API**
  - RESTful API endpoints
  - Express.js server with middleware
  - MongoDB database with Mongoose ODM
  - Input validation with express-validator
  - Comprehensive error handling

### 🔄 In Development
- **Frontend Application**
  - React.js user interface
  - Real-time location tracking
  - Ride booking interface
  - Driver-passenger matching

### 📋 Planned Features
- Real-time driver-passenger communication
- Payment integration
- Rating and review system
- Admin dashboard
- Push notifications

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io-client** - Real-time communication (planned)

### Development Tools
- **Git** - Version control
- **npm** - Package manager

## 📁 Project Structure

```
Uber-Clone/
├── backend/
│   ├── controllers/
│   │   └── user.controller.js
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   └── user.routes.js
│   ├── services/
│   │   └── user.services.js
│   ├── db/
│   │   └── db.js
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── package.json
│   └── (React components - in development)
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/uber-clone.git
   cd uber-clone
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Start Backend Server**
   ```bash
   npm start
   # or
   node server.js
   ```

5. **Frontend Setup** (when ready)
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/users
```

### Endpoints

#### POST `/register`
Register a new user account.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

#### GET `/profile/:id`
Get user profile information.

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

For detailed API documentation, see [backend/README.md](backend/README.md).

## 🔧 Development

### Backend Development
- The backend uses Express.js with MVC architecture
- Controllers handle HTTP requests and responses
- Services contain business logic
- Models define database schemas
- Routes define API endpoints

### Code Style
- Use meaningful variable and function names
- Add comments for complex logic
- Follow RESTful API conventions
- Implement proper error handling

## 🧪 Testing

To run tests (when implemented):
```bash
cd backend
npm test
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

If you have any questions or need help, please open an issue on GitHub.

## 🔗 Links

- [Backend API Documentation](backend/README.md)
- [Frontend Documentation](frontend/README.md) (coming soon)

---

**Note:** This project is currently in active development. The backend API is functional, and the frontend is being developed. 