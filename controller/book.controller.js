const Book = require("../models/book");

const addBooks = async (data) => {
  // query DB here
  const books = new Book(data);
  const book_result = books.save();
  return book_result;
};

const getBook = async (id) => {
  const get_book = Book.findById(id, { name, genre });
};

module.exports = { add_book: addBooks };
