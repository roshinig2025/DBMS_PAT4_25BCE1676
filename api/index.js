const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Cloud Database Connection Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Auto-initialize Tables on Cold Start
async function initDB() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        role VARCHAR(20) CHECK (role IN ('user', 'admin'))
      );

      CREATE TABLE IF NOT EXISTS complaints (
        complaint_id VARCHAR(20) PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        category VARCHAR(50) NOT NULL,
        priority VARCHAR(20) NOT NULL,
        description TEXT,
        user_email VARCHAR(100),
        user_name VARCHAR(100),
        status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Resolved'))
      );
    `);
  } catch (err) {
    console.error('Database Init Error:', err);
  } finally {
    client.release();
  }
}

// Middleware to ensure DB exists
app.use(async (req, res, next) => {
  await initDB();
  next();
});

// API ROUTES
app.get('/api/complaints', async (req, res) => {
  const { userEmail, role } = req.query;
  try {
    let result;
    // If the account is a regular user, filter complaints by their email
    if (role === 'user' && userEmail) {
      result = await pool.query(
        'SELECT * FROM complaints WHERE user_email = $1 ORDER BY complaint_id DESC',
        [userEmail]
      );
    } else {
      // Admin sees all complaints
      result = await pool.query('SELECT * FROM complaints ORDER BY complaint_id DESC');
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/complaints', async (req, res) => {
  const { title, category, priority, description, userEmail, userName } = req.body;
  const complaintId = 'CMP-' + Math.floor(1000 + Math.random() * 9000);
  try {
    await pool.query(
      `INSERT INTO complaints (complaint_id, title, category, priority, description, user_email, user_name, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'Pending')`,
      [complaintId, title, category, priority, description, userEmail, userName]
    );
    res.json({ success: true, id: complaintId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/complaints/:id', async (req, res) => {
  const { status } = req.body;
  try {
    await pool.query('UPDATE complaints SET status = $1 WHERE complaint_id = $2', [status, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/complaints/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM complaints WHERE complaint_id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;