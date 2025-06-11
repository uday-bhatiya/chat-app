# **💬 MERN Chat App**
A real-time chat application built using the MERN stack (MongoDB, Express.js, React, Node.js) with Socket.IO for instant messaging. Users can register, log in, update their profile pictures, and chat with others in real time.

---
## **🚀 Features**

- 🔐 User Authentication (Signup/Login/Logout)
- 🧑‍💼 Profile Picture Upload (via Cloudinary)
- 💬 Real-time Messaging with Socket.IO
- 📨 View Past Messages
- 🧾 Simple & responsive UI (built with React + Tailwind CSS)
- 🗂️ State Management using Zustand

---
## **🛠️ Tech Stack**
**Frontend**
- React
- Vite
- Tailwind CSS + DaisyUI
- Zustand
- Socket.IO Client
  
**Backend**
- Node.js
- Express.js
- MongoDB (via Mongoose)
- Socket.IO
- JWT for authentication
- Cloudinary for image uploads

---
## **📦 Installation**
1. Clone the repo
```git clone https://github.com/uday-bhatiya/chat-app.git
cd chat-app
```

2. Setup environment variables
   Create a `.env` file in the `backend/` directory and add:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
3. Install dependencies
4. Run the app
