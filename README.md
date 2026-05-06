![ChatZone GitHub Banner](/C:/Users/PIYUSH/.gemini/antigravity/brain/62bc8cf5-0345-4682-9dd4-b1da64ead99b/chatzone_github_banner_wide_1778079093129.png)

# 💬 ChatZone - Real-Time Chat Application

ChatZone is a premium, full-stack real-time chatting application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io. It features a modern, high-performance interface styled entirely with **Vanilla CSS** for a unique and high-end aesthetic.

## ✨ Features

- **Real-Time Messaging**: Instant message delivery using Socket.io.
- **Online Status Indicators**: See who is online in real-time.
- **Image Attachments**: Send images in your chats via Cloudinary integration.
- **Secure Authentication**: JWT-based auth with encrypted passwords and secure cookies.
- **Premium Dark UI**: A sleek, custom-designed dark theme with smooth transitions and glassmorphism.
- **Responsive Design**: Fully functional across different screen sizes.
- **Profile Management**: Update your profile picture and view account details.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19 (via Vite)
- **State Management**: Zustand
- **Routing**: React Router
- **Icons**: Lucide React
- **Real-Time**: Socket.io-client
- **Styling**: Pure Vanilla CSS (No Tailwind/DaisyUI)

### Backend
- **Server**: Node.js & Express
- **Database**: MongoDB (Mongoose)
- **Real-Time**: Socket.io
- **Auth**: JSON Web Tokens (JWT) & BcryptJS
- **File Uploads**: Cloudinary
- **Middleware**: Cookie-parser, CORS, Dotenv

## 🛠️ Getting Started

### Prerequisites
- Node.js installed
- MongoDB URI (local or Atlas)
- Cloudinary account for image support

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd chatzone
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5001
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the App

1. **Start the Backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open **http://localhost:5173** (or the port shown in your terminal) to start chatting!

## 📸 Interface Preview

The application features a sleek dark-themed interface with a clean sidebar and focused chat experience.

---

Built with ❤️ as a modern real-time communication platform.
