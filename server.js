const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Update with your own MySQL credentials
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'expense_tracker'
});

db.connect((err) => {
  if (err) {
    console.error('DB connection error:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Register endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // Check if user already exists
  db.query('SELECT id FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length > 0) {
      return res.status(400).send('Username already taken');
    }

    // Insert new user
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, insertResult) => {
      if (err) return res.status(500).send('Server error');
      return res.status(200).send('User registered successfully');
    });
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT id FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) {
      return res.status(401).send('Invalid username or password');
    }
    const userId = results[0].id;
    res.status(200).json({ userId });
  });
});

// Fetch transactions (with optional filters)
app.post('/transactions', (req, res) => {
  const { userId, timeRange, sortOrder, category, searchTerm } = req.body;

  let query = "SELECT * FROM transactions WHERE user_id = ?";
  let params = [userId];

  // Time filter
  if (timeRange) {
    query += " AND date >= (CURDATE() - INTERVAL ? DAY)";
    params.push(parseInt(timeRange));
  }

  // Category filter
  if (category && category.trim() !== '') {
    query += " AND category = ?";
    params.push(category);
  }

  // Search by description
  if (searchTerm && searchTerm.trim() !== '') {
    query += " AND description LIKE ?";
    params.push('%' + searchTerm + '%');
  }

  // Sorting
  if (sortOrder) {
    switch (sortOrder) {
      case 'most-recent':
        query += " ORDER BY date DESC";
        break;
      case 'oldest':
        query += " ORDER BY date ASC";
        break;
      case 'highest':
        query += " ORDER BY amount DESC";
        break;
      case 'lowest':
        query += " ORDER BY amount ASC";
        break;
      case 'alphabetical':
        query += " ORDER BY description ASC";
        break;
      default:
        query += " ORDER BY date DESC";
    }
  } else {
    query += " ORDER BY date DESC";
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).send('Server error');
    res.json(results);
  });
});

// Update transaction amount
app.post('/update-transaction', (req, res) => {
  const { userId, transactionId, newAmount } = req.body;
  db.query("UPDATE transactions SET amount = ? WHERE id = ? AND user_id = ?", [newAmount, transactionId, userId], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.affectedRows === 0) return res.status(404).send('Transaction not found or not owned by user');
    res.sendStatus(200);
  });
});

// Add new transaction
app.post('/add-transaction', (req, res) => {
  const { userId, date, category, description, amount, paymentMethod, notes } = req.body;
  if (!userId || !date || !category || !description || amount == null) {
    return res.status(400).send('Missing required fields');
  }

  const query = "INSERT INTO transactions (user_id, date, category, description, amount, payment_method, notes) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const params = [userId, date, category, description, amount, paymentMethod || '', notes || ''];

  db.query(query, params, (err, result) => {
    if (err) return res.status(500).send('Server error');
    res.sendStatus(200);
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
