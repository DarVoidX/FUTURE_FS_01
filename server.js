/* ══════════════════════════════════════════
   DARSHAN NAIDU PORTFOLIO — server.js
   Express backend for contact messages & admin
   ══════════════════════════════════════════ */

const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── DATABASE SETUP ───
const db = new Database(path.join(__dirname, 'portfolio.db'));
db.pragma('journal_mode = WAL');

// Create messages table
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT DEFAULT '',
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_read INTEGER DEFAULT 0
  )
`);

// Create admin users table
db.exec(`
  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  )
`);

// Seed default admin user if none exists
const adminCount = db.prepare('SELECT COUNT(*) as cnt FROM admin_users').get();
if (adminCount.cnt === 0) {
  const hash = bcrypt.hashSync('darshan@admin2026', 10);
  db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run('darshan', hash);
  console.log('✓ Default admin created — username: darshan');
}

// ─── MIDDLEWARE ───
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // serve static files (index.html, style.css, etc.)

// ─── API: Submit Contact Message ───
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    const stmt = db.prepare('INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)');
    stmt.run(name, email, subject || '', message);
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
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username);

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  // Simple token (in production, use JWT)
  const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
  res.json({ success: true, token, username: user.username });
});

// ─── ADMIN API: Get Messages (requires token) ───
app.get('/api/admin/messages', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = Buffer.from(token, 'base64').toString();
    const username = decoded.split(':')[0];

    const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const messages = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
    res.json({ messages });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// ─── ADMIN API: Mark message as read ───
app.patch('/api/admin/messages/:id/read', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    db.prepare('UPDATE messages SET is_read = 1 WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update.' });
  }
});

// ─── ADMIN API: Delete message ───
app.delete('/api/admin/messages/:id', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    db.prepare('DELETE FROM messages WHERE id = ?').run(req.params.id);
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
