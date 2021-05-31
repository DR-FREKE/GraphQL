const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  name: {
    type: String,
    max: 255,
    default: null,
  },
  genre: {
    type: String,
    max: 255,
  },
  authorId: {
    type: String,
  },
});

module.exports = model("Book", bookSchema);
