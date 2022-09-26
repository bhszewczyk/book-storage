const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const books = require('./books.json');
const { v4: getUuid } = require('uuid');

// enables parsing url forms
app.use(express.urlencoded({ extended: true }));
// define absolute path to the views
app.set('views', path.join(__dirname, 'views'));
// set up engine as EJS
app.set('view engine', 'ejs');

// render home page
app.get('/', (req, res) => {
	res.render('home');
});

// render book list
app.get('/books', (req, res) => {
	res.render('books', { books });
});

// show details of one book using ID
app.get('/book/:id', (req, res) => {
	const { id } = req.params;
	const book = books[id];

	res.render('book', { book });
});

// render a form for adding a new book
app.get('/books/new', (req, res) => {
	res.render('new');
});

// take what was submited in the form (req.body) and push it to the books database
// redirect to the books to display a book list (including a new one)
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

// listen to the port
app.listen(PORT, () => {
	console.log(`Listening to port ${PORT}...`);
});
