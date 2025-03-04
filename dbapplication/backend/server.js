const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to the database
let db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
)`, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Table created or already exists.');
});

// Endpoint to add a user
app.post('/add-user', (req, res) => {
    const { name, email } = req.body;

    db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, [name, email], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: `A row has been inserted with rowid ${this.lastID}` });
    });
});

// Endpoint to get all users
app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ users: rows });
    });
});

// Endpoint to update a user
app.put('/update-user/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    db.run(`UPDATE users SET name = ?, email = ? WHERE id = ?`, [name, email, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: `Row(s) updated: ${this.changes}` });
    });
});

// Endpoint to delete a user
app.delete('/delete-user/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM users WHERE id = ?`, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: `Row(s) deleted: ${this.changes}` });
    });
});




// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
