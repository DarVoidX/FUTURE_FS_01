# 💻 Darshan Naidu — Full Stack Portfolio with Secure Admin Dashboard

## 🌐 Live Demo
[https://darshan-portfolio-phyt.onrender.com](https://darshan-portfolio-phyt.onrender.com)

## 📌 Internship Project
This project was developed as part of the **Future Interns Full Stack Web Development Internship (Task 1)**.

Clean modern UI with responsive layouts, smooth transitions, and glassmorphism-inspired styling. Included is a secure custom Node.js/MongoDB backend and a responsive secret Admin Control Panel for real-time contact message management.

---

## ✨ Features

- **Responsive Modern UI**: Flawless, pixel-perfect experience across desktop, tablet, and mobile displays.
- **Secure Admin Control Panel**: A hidden dashboard to view, mark as read, and delete contact inquiries.
- **MongoDB Atlas Integration**: Cloud persistent database storage ensuring contact messages are saved permanently.
- **Robust Message Management**: Real-time admin feedback and message statistic counters.
- **Anti-Theft Source Code Protection**: Built-in inspect-element console warnings, hidden copyright comments, and meta signatures.
- **Elegant Typography & Styling**: Custom luxurious serif display headings and sleek frosted glass containers.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), FontAwesome Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (M0 Free Shared Tier)
- **Authentication**: Custom cryptographically secure session tokens, `bcryptjs` password hashing
- **Hosting & Deployment**: Render (Web Service Free Tier)

---

## 📁 Repository Architecture

```bash
├── admin.html               # Secret Admin Control Panel Dashboard
├── index.html               # Main responsive portfolio homepage & sections
├── style.css                # Custom core CSS design system, typography & transitions
├── script.js                # Frontend navigation transitions & forms logic
├── server.js                # Express server, MongoDB connection, API routes & admin authentication
├── profile.jpg              # Professional portrait photo
├── package.json             # Node dependencies and execution scripts
```

---

## 🚀 Step-by-Step Local Setup

### 1. Clone the Project
```bash
git clone <your-repository-url>
cd port
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=3000
```

### 4. Run the Development Server
```bash
npm start
```
The server will boot up and listen on **`http://localhost:3000`** with the MongoDB database connection active.

---

## 🔒 Secret Admin Control Panel

A fully secure, real-time message dashboard is built into the portfolio. You can view, mark as read, and delete contact inquiries securely.

- **Access URL**: **`http://localhost:3000/dn-control-panel`**
- **Default Credentials**: Admin credentials are securely configured and initialized in the backend code during the database setup to protect privacy.

---

## 📸 Screenshots

### Homepage Layout
<img src="home page.png" width="600" alt="Homepage Layout" />

### Secret Admin Dashboard
<img src="admin page.png" width="600" alt="Secret Admin Dashboard" />

### Mobile Responsive View
<img src="phone image.jpeg" width="280" alt="Mobile Responsive View" />

---

## 🌐 Production Deployment Guide

This project is fully cloud-ready and deployed using free hosting tiers. 

### Deploying on Render:
1. Create a new **Web Service** on Render and link your GitHub repository.
2. Set **Build Command**: `npm install`
3. Set **Start Command**: `npm start`
4. Under **Environment Variables**, add:
   - **Key**: `MONGODB_URI`
   - **Value**: `your_mongodb_atlas_connection_string` (ensure you replace the password placeholder with your actual MongoDB Atlas database password).
5. Click **Create Web Service**. Render will automatically build, deploy, and launch your live site!

---

## 📜 License

© 2026 Darshan Naidu. All rights reserved.
