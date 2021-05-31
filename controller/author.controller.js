const Author = require("../models/author");

const addAuthor = async (data) => {
  // query DB
  const author = new Author(data);
  const saved_item = author.save();
  return saved_item;
};

const getAuthor = async (id) => {
  const get_author = Author.findById(id, { name, age });
  if (get_author) {
    return get_author;
  }
};

module.exports = { add_author: addAuthor, get_author: getAuthor };
