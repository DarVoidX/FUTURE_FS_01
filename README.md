# 💻 Darshan Naidu — Premium Developer Portfolio & AI Systems Hub

A visually stunning, high-performance, ultra-modern developer portfolio styled with an elite **Dark Terminal Editorial** design language. Optimized for premium visual aesthetics, mathematical centering, and smooth CSS-driven page state transitions. Included is a secure custom Node.js/SQLite backend and a responsive secret Admin Control Panel for real-time contact message management.

---

## 🎨 Design & Aesthetic Highlights

- **Thematic Integration**: Shipped in a stellar **Cyber-Cyan & Slate-Charcoal Gray** monochrome color palette (`#00f0ff` glow accents).
- **Dot-Art Wallpaper Framing**: Custom-integrated *Creation of Adam* high-concept digital dot-art backdrop, aligned with `background-size: contain` to frame the home content flawlessly on all screens.
- **Glassmorphic Navigation Capsule**: The primary homepage navigation links and social icons float dynamically inside delicate, curved glass capsules with a deep frosted backing blur (`backdrop-filter: blur(10px)`) to guarantee flawless legibility over background dots.
- **Absolute Typography Alignment**: Leverages a highly condensed, bold editorial display font (`Bebas Neue`) with the terminal blinking cursor (`_`) positioned absolutely to ensure 100% perfect mathematical and visual centering of display content.
- **Micro-Animations & Transitions**: Dynamic CSS scaling, glowing 1px active capsule borders, and smooth state-based section transitions (`body.state-home` vs `body.state-section`).
- **Responsive Portrait Grid**: Features a vertical rectangular profile card structure (`160px` by `200px`) using standard `object-fit: cover` and styled cyan brackets to scale portrait images flawlessly.

---

## 🛠️ Technology Stack

- **Frontend**: Vanilla HTML5, Premium CSS3, Responsive JavaScript (ES6+), FontAwesome Icons.
- **Typography**: Google Fonts (Bebas Neue, DM Mono, DM Sans).
- **Backend**: Node.js, Express.js.
- **Database**: SQLite3 (lightweight, structured SQL storage for message logs).
- **Security**: Password hashing using `bcryptjs` and session tokens powered by custom cryptographically secure tokens.

---

## 📁 Repository Architecture

```bash
├── admin.html               # Secret Admin Control Panel Dashboard
├── index.html               # Main responsive portfolio homepage & sections
├── style.css                # Custom core CSS design system, typography & transitions
├── script.js               # Frontend navigation transitions & forms logic
├── server.js                # Express Server, SQLite API routes & authentication
├── portfolio.db             # Local SQLite database (auto-generated)
├── profile.jpg              # Professional portrait photo
├── code_background.png      # High-concept Creation of Adam dot-art wallpaper
└── package.json             # Node dependencies and execution scripts
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

### 3. Run the Development Server
```bash
npm start
```
The server will boot up and listen on **`http://localhost:3000`** with the SQLite database (`portfolio.db`) automatically initialized!

---

## 🔒 Secret Admin Control Panel

A fully secure, real-time message dashboard is built into the portfolio. You can view, mark as read, and delete contact inquiries securely.

- **Access URL**: **`http://localhost:3000/dn-control-panel`**
- **Default Credentials**:
  - **Username**: `darshan`
  - **Password**: `darshan@admin2026`

> [!WARNING]
> Prior to hosting the portfolio publicly on GitHub or deploying to production, make sure to change the admin password.
> You can update the password hash in `server.js` by running a secure hash generator or replacing the initialization logic on line 44.

---

## 🌐 Production Deployment Guide

Since this application includes a dynamic Express server and SQLite database, it must be hosted on a provider that supports Node.js execution.

### Recommended Hosting Services

1. **Render (Recommended — Free Tier)**:
   - Create a new **Web Service** pointing to your GitHub repository.
   - Set Build Command: `npm install`
   - Set Start Command: `node server.js`
   - Set the `PORT` Environment Variable to `3000` (optional).
   - *Note: To persist SQLite messages, set up a dynamic disk volume on Render, or simply use Render's built-in PostgreSQL add-on if persistent disk storage is not preferred.*

2. **Railway (Ultra-Fast Deployment)**:
   - Create a new project and link your GitHub repo.
   - Railway will automatically detect the `package.json` file and deploy the Express server.
   - Under Settings, you can attach a persistent volume to preserve `portfolio.db` message backups!

3. **VPS / Self-Hosting (DigitalOcean, AWS, Linode)**:
   - Clone the repository onto your server.
   - Run `npm install` and start the process using a process manager like **PM2**:
     ```bash
     pm2 start server.js --name "portfolio"
     ```
   - Set up an Nginx reverse proxy to forward traffic to port `3000`.

---

## 📜 License

Created with passion by **Darshan Naidu** © 2026. All rights reserved.
