const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const books = require('./books.json');

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

app.listen(PORT, () => {
	console.log(`Listening to port ${PORT}...`);
	// books.forEach((book) => {
	// 	console.log(book.author);
	// });
});
