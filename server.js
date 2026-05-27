/* ══════════════════════════════════════════
   DARSHAN NAIDU PORTFOLIO — server.js
   Express backend for contact messages & admin
   ══════════════════════════════════════════ */

require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── DATABASE SETUP (MongoDB) ───
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✓ Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schemas
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  is_read: { type: Boolean, default: false }
});

const adminUserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password_hash: { type: String, required: true }
});

const Message = mongoose.model('Message', messageSchema);
const AdminUser = mongoose.model('AdminUser', adminUserSchema);

// Seed default admin user if none exists
async function seedAdmin() {
  const adminCount = await AdminUser.countDocuments();
  if (adminCount === 0) {
    const adminUsername = process.env.ADMIN_USERNAME || 'darshan';
    const adminPassword = process.env.ADMIN_PASSWORD || 'darshan@admin2026';
    const hash = bcrypt.hashSync(adminPassword, 10);
    await AdminUser.create({ username: adminUsername, password_hash: hash });
    console.log(`✓ Default admin created — username: ${adminUsername}`);
  }
}
seedAdmin();

// ─── MIDDLEWARE ───
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // serve static files (index.html, style.css, etc.)

// ─── API: Submit Contact Message ───
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    await Message.create({ name, email, subject, message });
    res.json({ success: true, message: 'Message saved successfully.' });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Failed to save message.' });
  }
});

// ─── ADMIN: Secret URL route ───
// Access admin panel via: http://localhost:3000/dn-control-panel
app.get('/dn-control-panel', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// ─── ADMIN API: Login ───
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const user = await AdminUser.findOne({ username });

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  // Simple token (in production, use JWT)
  const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
  res.json({ success: true, token, username: user.username });
});

// ─── ADMIN API: Get Messages (requires token) ───
app.get('/api/admin/messages', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = Buffer.from(token, 'base64').toString();
    const username = decoded.split(':')[0];

    const user = await AdminUser.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const messages = await Message.find().sort({ created_at: -1 });
    res.json({ messages });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// ─── ADMIN API: Mark message as read ───
app.patch('/api/admin/messages/:id/read', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await Message.findByIdAndUpdate(req.params.id, { is_read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update.' });
  }
});

// ─── ADMIN API: Delete message ───
app.delete('/api/admin/messages/:id', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete.' });
  }
});

// ─── START SERVER ───
app.listen(PORT, () => {
  console.log(`\n  ╔══════════════════════════════════════╗`);
  console.log(`  ║  Portfolio Server Running             ║`);
  console.log(`  ║  → http://localhost:${PORT}             ║`);
  console.log(`  ║  → Admin: /dn-control-panel           ║`);
  console.log(`  ╚══════════════════════════════════════╝\n`);
});
