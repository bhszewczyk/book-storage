const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const books = require('./books.json');
const { v4: getUuid } = require('uuid');

// define absokute path to the views
app.set('views', path.join(__dirname, 'views'));
// set up engine as EJS
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/books', (req, res) => {
	res.render('books', { books });
});

app.get('/book/:id', (req, res) => {
	const { id } = req.params;
	const book = books[id];

	res.render('book', { book });
});

app.get('/books/new', (req, res) => {
	res.render('new');
});

app.listen(PORT, () => {
	console.log(`Listening to port ${PORT}...`);
});
