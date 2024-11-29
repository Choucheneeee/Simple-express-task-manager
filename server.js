const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.set('view engine', 'ejs'); // Set EJS as the templating engine
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(express.static('public')); // Serve static files

// In-memory storage for to-do items
let todos = [];

// Routes
app.get('/', (req, res) => {
    res.render('index', { todos }); // Pass todos to the EJS file
});

app.post('/add', (req, res) => {
    const todo = req.body.todo; // Get the new to-do item from the form
    if (todo) todos.push(todo); // Add it to the list if it's not empty
    res.redirect('/'); // Redirect back to the homepage
});

app.post('/delete', (req, res) => {
    const index = req.body.index; // Get the index of the item to delete
    if (index !== undefined) todos.splice(index, 1); // Remove it
    res.redirect('/');
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
