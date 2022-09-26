const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const books = require('./books.json');
const methodOverride = require('method-override');
const { v4: getUuid } = require('uuid');
const { ECDH } = require('crypto');

// enables parsing url forms
app.use(express.urlencoded({ extended: true }));

// use methodOverride to change the method to proper one in web
// as forms can only send GET and POST requests
app.use(methodOverride('_method'));

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

	res.render('book', { book, id });
});

app.get('/book/:id/edit', (req, res) => {
	// console.log(req.params);
	const { id } = req.params;

	const book = books[id];
	res.render('edit', { book, books, id });
});

app.patch('/book/:id', (req, res) => {
	console.log(req.params);
	const { id } = req.params;
	const existingBook = books[id];

	if (!existingBook) {
		res.render('<h1>Not found</h1>');
	}
	const { author, title, year, country, language, link, pages } = req.body;
	existingBook.author = author;
	existingBook.title = title;
	existingBook.year = year;
	existingBook.country = country;
	existingBook.language = language;
	existingBook.link = link;
	existingBook.pages = pages;

	res.render('books', { books });
});

// render a form for adding a new book
app.get('/books/new', (req, res) => {
	res.render('new');
});

// take what was submited in the form (req.body) and push it to the books database
// redirect to the books to display a book list (including a new one)
app.post('/books', (req, res) => {
	const { author, title, year, country, language, link, pages } = req.body;
	const newBook = {
		author,
		title,
		year,
		country,
		language,
		link,
		pages,
	};
	books.push(newBook);
	res.redirect('/books');
});

// listen to the port
app.listen(PORT, () => {
	console.log(`Listening to port ${PORT}...`);
});
