const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const books = require('./books.json');
const { v4: getUuid } = require('uuid');

app.use(express.urlencoded({ extended: true }));
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

app.post('/books', (req, res) => {
	const { author, title, year, country, language, img, pages } = req.body;
	const newBook = {
		author,
		title,
		year,
		country,
		language,
		img,
		pages,
	};
	books.push(newBook);
	res.redirect('/books');
});

app.listen(PORT, () => {
	console.log(`Listening to port ${PORT}...`);
});
